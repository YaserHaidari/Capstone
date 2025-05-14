import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Image } from "react-native";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  child,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInfo from "./firebase/getUserInfo";
import { supabase } from "@/app/supabase/initiliaze";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

function HomeScreen() {
  const [welcomeMessage, setWelcomeMessage] = useState<String>("");
  const [textMessage, setTextMessage] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    fetchUser();
    initializeUser();
    finitializeSupabase();
  }, []);

  async function initializeUser() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userCredentials = {
        email: currentUser.email,
        uid: currentUser.uid,
      };

      try {
        await AsyncStorage.setItem(
          "USERCREDENTIALS",
          JSON.stringify(userCredentials)
        );
        console.log("User credentials saved to AsyncStorage");
      } catch (error) {
        console.error("Error saving user credentials:", error);
      }
    }
  }

  async function fetchUser() {
    const auth = getAuth();
    console.log(auth.currentUser);
    if (auth.currentUser?.displayName && auth.currentUser.photoURL) {
      setWelcomeMessage(auth.currentUser?.displayName);
      if (photoUrl !== "") {
        setPhotoUrl(auth.currentUser?.photoURL);
      }
      console.log(auth.currentUser.photoURL);
    }
  }

  async function finitializeSupabase() {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.log(error.message);
        return;
      }
      setTutors(data.filter((item) => item.user_type == 'tutor'))
      console.log(tutors);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const db = getDatabase();
    const dbRef = ref(db, "users");
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMessages(Object.values(data));
      }
    });
  }

  async function sendMessage() {
    const userInfo = UserInfo();
    if (!userInfo) {
      console.error("User info not found");
      return;
    }

    const { name, uid, photoUrl } = userInfo;
    const db = getDatabase();
    const newMsgKey = push(child(ref(db), "users")).key; // Generate a unique key for the message

    // Construct the message object
    const newMessage = {
      id: newMsgKey,
      userId: uid,
      userName: name,
      photoUrl: photoUrl,
      message: textMessage, // The message from the input field
      timestamp: Date.now(), // Add a timestamp
    };

    // Update the database with the new message
    const updates = {};
    updates[`users/${newMsgKey}`] = newMessage;

    try {
      await update(ref(db), updates);
      console.log("Message sent successfully!");
      setTextMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <View className=" flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Text className="text-4xl font-bold font-Title text-black text-center pt-5">
          Coffee Meets Careers {welcomeMessage}
        </Text>
        {photoUrl ? (
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: photoUrl }}
            width={40}
            height={40}
          />
        ) : (
          ""
        )}
        <View className={"flex-1 mt-4 mx-8 mb-5"}>
          <View
            className={
              "flex-row items-center bg-white rounded-full px-5 h-16 border border-gray-400"
            }
          >
            <Ionicons name="search-outline" size={24} color="black" />

            <TextInput
                value={textMessage}
                onChangeText={(msg) => setTextMessage(msg)}
                placeholder="Search for a mentor..."
                className="flex-1 ml-1.5 font-Text text-lg font-normal text-gray-800"
                textAlignVertical="center"
            />
            <Feather name="filter" size={24} color="black" />
          </View>
        </View>
          {/*
          <Button onPress={sendMessage} title="Send" />
            {messages.map((item, index) => {
              return (
                <View key={index}>
                  <Text>
                    {item.userName}: {item.message}
                  </Text>
                </View>
              );
            })}
          */}

          <Text className={"text-lg font-extrabold font-Menu ml-7 mb-4"}>
            Recent Updates
          </Text>


          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-5 ml-7 mb-5">
              <Image
                source={{uri: "https://avatar.iran.liara.run/public/"}}
                style={{width:80,height:80,}}
                className="rounded-full border-2 border-gray-200"
             />
              <Image
                  source={{uri: "https://avatar.iran.liara.run/public/"}}
                  style={{width:80,height:80,}}
                  className="rounded-full border-2 border-gray-200"
              />
              <Image
                  source={{uri: "https://avatar.iran.liara.run/public/"}}
                  style={{width:80,height:80,}}
                  className="rounded-full border-2 border-gray-200"
              />
              <Image
                  source={{uri: "https://avatar.iran.liara.run/public/"}}
                  style={{width:80,height:80,}}
                  className="rounded-full border-2 border-gray-200"
              />
              <Image
                  source={{uri: "https://avatar.iran.liara.run/public/"}}
                  style={{width:80,height:80,}}
                  className="rounded-full border-2 border-gray-200"
              />
              <Image
                  source={{uri: "https://avatar.iran.liara.run/public/"}}
                  style={{width:80,height:80,}}
                  className="rounded-full border-2 border-gray-300"
              />

            </View>
          </ScrollView>

          <Text className={"text-lg font-extrabold font-Menu ml-7 mb-4"}>
            Recommended
          </Text>
          {tutors.map((item, index) => {
            return (
              <View
                key={index}
                className="bg-white rounded-xl mb-4 mx-7 h-48 border border-stone-400"
              >
                <View
                className="flex-row"
                >
                {item.photoURL && (
                  <Image
                    source={{ uri: item.photoURL }}
                    className="h-14 w-14 rounded-full m-2"

                  />
                )}

                <View
                className=" flex-1 bg-stone-200 m-2 h-32 rounded-lg items-center"
                >
                  <Text
                  className="font-Menu font-semibold text-black p-3"
                  >
                    "This is a sample bio"
                  </Text>
                  <Text
                      className="font-Text font-normal text-gray-700 pr-3 pl-3"
                  >
                    Lorem ipsum dolo sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempr incididunt ut labore et dolore manga aliqua.
                  </Text>
                </View>
                </View>


                <View
                className="flex-1 justify-end ml-20"
                >
                  <Text
                    className={
                      "text-xl font-medium font-Title text-gray-800"
                    }
                  >
                    {item.name}
                  </Text>
                  <Text className={"text-[14px] font-Menu font-light text-gray-700 mb-1.5"}>
                    Tutor since: {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            );
          })}

      </ScrollView>
    </View>
  );
}

export default HomeScreen;