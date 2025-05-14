import {View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView} from "react-native"
import React, { useState, useEffect } from 'react';
import {supabase} from "@/app/supabase/initiliaze";
import {Session} from "@supabase/supabase-js";
import { useRouter } from "expo-router";



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


export default function updateProfile()
{
    const [newDetail, setNewDetail] = useState({ Name:"", Bio:"", Role:"", DOB:"", Email:"", Location:""});
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

    //Handles deleting account
    const deleteUser = async (email:string) =>{
        const { error } = await supabase.from("users").delete().eq("email", email);

        if (error) {
            console.error("Error updating task: ", error.message);
            return;
        }
    };


    //Handle Submit to Update Details in Database
    const handleSubmit = async (email: string) => {
        // Prepare an object with the fields that have been updated.
        const updatedFields: any = {};

        // Only add fields to the update object if they have been modified
        if (newDetail.Name) updatedFields.name = newDetail.Name;
        if (newDetail.Bio) updatedFields.bio = newDetail.Bio;
        if (newDetail.Role) updatedFields.user_type = newDetail.Role;
        if (newDetail.DOB) updatedFields.DOB = newDetail.DOB;
        if (newDetail.Email) updatedFields.email = newDetail.Email;
        if (newDetail.Location) updatedFields.Location = newDetail.Location;

        // Perform the update operation if there are fields to update
        if (Object.keys(updatedFields).length > 0) {
            const { error } = await supabase
                .from("users")
                .update(updatedFields)
                .eq("email", email);

            if (error) {
                console.error("Error updating user details: ", error.message);
                return;
            }

        }
    };

    //navigates to profile page
    function navigateToProfile() {
        const router = useRouter();
        router.push("/profile");
    }
    //navigates to login page
    function navigateToLogin() {
        const router = useRouter();
        router.push("/login");
    }

    // Style for the profile avatar.
    const styles = StyleSheet.create({
        ProfileAvatar: {
            width: 100,
            height: 100,
            marginBottom: 10,
        }
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust this offset if needed
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        className="bg-white mb-4"
            >

                {/* Profile avatar including background color */}
                <View className=" w-screen p-4 items-center">
                    <Image
                        style={styles.ProfileAvatar}
                        className="rounded-full border-2 border-stone-300"
                        source={{uri:'https://avatar.iran.liara.run/public/41'}}
                    />
                </View>

                {/* Profile details with hard-coded text */}
                {user && (
                <View className="p-4 w-11/12 mx-auto ">
                    <Text className="text-base font-medium font-Menu text-black">
                        Name
                    </Text>
                    <TextInput
                        placeholder={user.name}
                        onChangeText={(Text) => setNewDetail
                        ((prev) => ({...prev, Name: Text}))}
                        className="bg-gray-200 rounded-lg px-4 h-16 font-Text text-base mb-5"
                        placeholderTextColor="#000000"/>

                    <Text className="text-base font-medium font-Menu text-black">
                        Role
                    </Text>

                    <TextInput
                        placeholder={user.user_type}
                        onChangeText={(Text) => setNewDetail
                        ((prev) => ({...prev, Role:Text}))}
                        className="bg-gray-200 rounded-lg px-4 h-16 font-Text text-base mb-5"
                        placeholderTextColor="#000000"/>


                    <Text className="text-base font-medium font-Menu text-black">
                        Bio
                    </Text>
                    <TextInput
                        placeholder={user.bio}
                        onChangeText={(Text) => setNewDetail
                        ((prev) => ({...prev, Bio: Text}))}
                        className="bg-gray-200 rounded-lg px-4 h-16 font-Text text-base mb-5"
                        placeholderTextColor="#000000"/>


                    <Text className="text-base font-medium font-Menu text-black">
                        Date of Birth
                    </Text>

                    <TextInput
                        placeholder={user.DOB}
                        onChangeText={(Text) => setNewDetail
                        ((prev) => ({...prev, DOB:Text}))}
                        className="bg-gray-200 rounded-lg px-4 h-16 font-Text text-base mb-5"
                        placeholderTextColor="#000000"/>



                    <Text className="text-base font-medium font-Menu text-black">
                        Email
                    </Text>

                    <TextInput
                        placeholder={user.email}
                        onChangeText={(Text) => setNewDetail
                        ((prev) => ({...prev, Email:Text}))}
                        className="bg-gray-200 rounded-lg px-4 h-16 font-Text text-base mb-5"
                        placeholderTextColor="#000000"/>


                    <Text className="text-base font-medium font-Menu text-black">
                        Location
                    </Text>

                    <TextInput
                        placeholder={user.Location}
                        onChangeText={(Text) => setNewDetail
                        ((prev) => ({...prev, Location:Text}))}
                        className="bg-gray-200 rounded-lg px-4 h-16 font-Text text-base mb-5"
                        placeholderTextColor="#000000"/>


                    <View className="justify-center items-center">
                    <TouchableOpacity
                        onPress={() => {
                            handleSubmit(user.email); // Call the handleSubmit function
                            setTimeout(() => {
                                navigateToProfile(); // Call this after 1 second (1000 ms)
                            }, 1000);
                        }}
                        className="flex-row justify-center bg-primary w-5/6 px-4 rounded-lg h-14 items-center mb-5"
                    >
                        <Text className="text-xl font-Menu text-white font-medium">
                            Update Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            deleteUser(user.email); // Call the handleSubmit function
                            navigateToLogin(); // Then call navigateToLogin
                        }}
                        className="flex-row justify-center bg-red-700 w-5/6 px-4 rounded-lg h-14 items-center mb-5"
                    >
                        <Text className="text-xl font-Menu text-white font-medium">
                            Delete
                        </Text>
                    </TouchableOpacity>
                    </View>

                </View>
                )}
            </ScrollView>
            </KeyboardAvoidingView>
    )
}