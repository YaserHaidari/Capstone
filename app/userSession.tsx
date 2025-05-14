import React, { useEffect, useState } from "react";
import { supabase } from "@/app/supabase/initiliaze";
import Login from "@/app/login";
import {Imports} from "resolve.exports";
import Home from "@/app/home";
import UpdateProfile from "@/app/updateProfile";
import Profile from "@/app/profile";
import {Text, TouchableOpacity} from "react-native"


export default function userSession() {
     const [session, setSession] = useState<any>(null);

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

     const logoutFunction = async () => {
         await supabase.auth.signOut();

     };

    return session ? (
        <>
            <TouchableOpacity
                onPress={logoutFunction}
                style={{ marginTop: 20, backgroundColor: "#1F4E5F", padding: 12, borderRadius: 10 }}
            >
                <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>

            <UpdateProfile session={session} />
            <Profile session={session} />
        </>
    ) : (
        <Home />
    );


}
