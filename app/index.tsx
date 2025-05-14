import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { firebaseConfig } from "./firebase/firebse_initialize";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { router, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function HomeScreen() {
  useEffect(() => {
    // Initialize Firebase App
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Database
    getDatabase(app);

    console.log("Firebase App:" + app);
    console.log("Database Initialized");

    // REMOVE this line:
    setTimeout(() => {
       router.push('/notifications');
     }, 2000);

    // Initialize user on app load
    initilizeUser();
  }, []);

  // Function to initialize user
  async function initilizeUser() {
    const auth = getAuth();
    console.log("Auth Initialized");
    try {
      const userCredentials = await fetchUser();
      if(!userCredentials) {
        router.replace("/login");
      }
      // Check if userCredentials is valid
      if (userCredentials && userCredentials.email && userCredentials.pwd) {
        console.log("Received User Credentials:", userCredentials);

        // Attempt to sign in the user
        const user = await signInWithEmailAndPassword(
          auth,
          userCredentials.email,
          userCredentials.pwd
        );

        if (user.user) {
          console.log("User signed in successfully:", user.user.email);
          router.replace("/home");
        } else {
          console.log("No user found");
          //later change to home
          router.replace("/login");
        }
      }
    } catch (error) {
      console.error("Error during user initialization:", error.message);
    }
  }

  // Function to fetch user credentials from AsyncStorage
  async function fetchUser() {
    try {
      const userCredentials = await AsyncStorage.getItem("USERCREDENTIALS");

      if (userCredentials) {
        const parsedCredentials = JSON.parse(userCredentials);

        // Ensure parsedCredentials is an object with email and pwd
        if (parsedCredentials.email && parsedCredentials.pwd) {
          return parsedCredentials;
        }
      }
    } catch (error) {
      console.error("Error fetching user credentials:", error.message);
    }
    return null; // Return null if no valid credentials are found
  }

  return (
    <View
      style={{
        backgroundColor: "#16519f",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/icon.png")}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ color: "#fff", fontSize: 30 }}>Coffee Meets Careers</Text>
 
    </View>
  );
}
