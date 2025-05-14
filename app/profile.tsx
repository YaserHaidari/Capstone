import {View, Text, Image, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView} from "react-native"
import React, {useEffect, useState} from "react";
import {supabase} from "@/app/supabase/initiliaze";
import {Session} from "@supabase/supabase-js";
import {useRouter} from "expo-router";

interface User {
  id: number;
  created_at: string;
  user_type: string;
  photoURL: string;
  email: string;
  name: string;
  bio: string;
  Location: string;
  DOB: string;
}

export default function ProfileScreen()
{
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null);

  //Manages the users session
  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []);

  //logout functionality
  const logoutFunction = async () => {
    await supabase.auth.signOut();

  };

  //Fetch User Data
  const fetchUser = async () => {
    const { error, data } = await supabase.from("users").select("*").eq("email", session.user.email).single();

    if (error) {
      console.error("Error reading task: ", error.message);
      return;
    }

    setUser(data)
  };

  //Fetch data when the page loads
  useEffect(() => {
    if (session && session.user) {
      fetchUser();
    }
  }, [session]);
  console.log(user);


  // Style for the profile avatar.
  const styles = StyleSheet.create({
    ProfileAvatar: {
      width: 100,
      height: 100,
      marginBottom: 10,
    }
  });

  //navigate to update profile page
  function navigateToUpdateProfile() {
    const router = useRouter();
    router.push("/updateProfile");
  }

  //navigates to login page
  function navigateToLogin() {
    const router = useRouter();
    router.push("/login");
  }

  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                  className="bg-white mb-4"
      >

        {/* Profile avatar including background color */}
        <View className=" w-screen p-2 items-center">
          <Image
              style={styles.ProfileAvatar}
              className="rounded-full border-2 border-stone-300"
              source={{uri:'https://avatar.iran.liara.run/public/41'}}
          />
        </View>

        <View className="flex-row justify-center items-center pb-6">
          <TouchableOpacity onPress={navigateToUpdateProfile}>
            <Text className="text-base font-semibold font-Menu text-center text-primary">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile details with hard-coded text */}
        {user && (
            <View className="p-4 w-11/12 mx-auto">
              <Text className="text-base font-medium font-Menu text-black">
                Name
              </Text>
              <View className="bg-gray-200 rounded-lg px-4 h-16 justify-center mb-5">
                <Text
                    className="font-Text text-base text-black"
                >{user.name}</Text>
              </View>

              <Text className="text-base font-medium font-Menu text-black">
                Role
              </Text>

              <View className="bg-gray-200 rounded-lg px-4 h-16 justify-center mb-5">
                <Text
                    className="font-Text text-base text-black"
                >{user.user_type}</Text>
              </View>


              <Text className="text-base font-medium font-Menu text-black">
                Bio
              </Text>
              <View className="bg-gray-200 rounded-lg px-4 h-16 justify-center mb-5">
                <Text
                    className="font-Text text-base text-black"
                >{user.bio}</Text>
              </View>


              <Text className="text-base font-medium font-Menu text-black">
                Date of Birth
              </Text>

              <View className="bg-gray-200 rounded-lg px-4 h-16 justify-center mb-5">
                <Text
                    className="font-Text text-base text-black"
                >{user.DOB}</Text>
              </View>


              <Text className="text-base font-medium font-Menu text-black">
                Email
              </Text>

              <View className="bg-gray-200 rounded-lg px-4 h-16 justify-center mb-5">
                <Text
                    className="font-Text text-base text-black"
                >{user.email}</Text>
              </View>


              <Text className="text-base font-medium font-Menu text-black">
                Location
              </Text>

              <View className="bg-gray-200 rounded-lg px-4 h-16 justify-center mb-5">
              <Text
                  className="font-Text text-base text-black"
              >{user.Location}</Text>
            </View>

              <View className="justify-center items-center">
                <TouchableOpacity
                    onPress={() => {
                      logoutFunction(); // Call the handleSubmit function
                      navigateToLogin(); // Then call navigateToLogin
                    }}
                    className="flex-row justify-center bg-red-700 w-5/6 px-4 rounded-lg h-14 items-center mb-5"
                >
                  <Text className="text-xl font-Menu text-white font-medium">
                    Sign Out
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
        )}
      </ScrollView>
  )
}