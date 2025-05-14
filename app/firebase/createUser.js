/*
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {supabase} from '@/app/supabase/initiliaze'
export default async function createUser(email, password, name, photoURL, userType) {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const {user} = userCredential

        //update user displayname here
        await updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
        })

        // Create user in Supabase Auth
        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            return authError.message;
        }

        const {data, error} = await supabase.from('users').insert({
            name: name,
            email: email,
            user_type: userType == 0 ? "student" : 'tutor',
            photoURL: photoURL
        })
        console.log(userType == 0 ? "student" : 'tutor')

        if(error){
            return error.message
        }

        return "successful"; // Return "successful" if the user is created
    } catch (error) {
        return error.message; // Return the error message if there's an error
    }
}

 */
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { supabase } from '@/app/supabase/initiliaze'

export default async function createUser(email, password, name, photoURL, userType) {
    const auth = getAuth();
    try {
        // Step 1: Create user in Firebase
        console.log("Creating Firebase user...")
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const { user } = userCredential

        // Step 2: Update Firebase user profile
        console.log("Updating Firebase profile...")
        await updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
        })

        // Step 3: Create user in Supabase Auth
        console.log("Creating Supabase auth user...")
        const { data: signUpData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                    user_type: userType == 0 ? "student" : 'tutor',
                    photo_url: photoURL
                }
            }
        });

        if (authError) {
            console.error("Supabase auth error:", authError.message);
            return authError.message;
        }

        // Step 4: Wait for Supabase session to be established
        console.log("Getting Supabase session...")
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            console.error("Session error:", sessionError.message);
            return sessionError.message;
        }

        if (!sessionData.session) {
            console.error("No Supabase session created");
            return "Failed to create Supabase session";
        }

        // Step 5: Create user in Supabase database
        console.log("Creating user record in Supabase database...")
        const { data, error } = await supabase.from('users').insert({
            name: name,
            email: email,
            user_type: userType == 0 ? "student" : 'tutor',
            photoURL: photoURL
        }).select();

        if (error) {
            console.error("Supabase database error:", error.message);
            return error.message;
        }

        console.log("User successfully created in both systems!");
        return "successful";
    } catch (error) {
        console.error("User creation error:", error.message);
        return error.message;
    }
}