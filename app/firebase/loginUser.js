
/*
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export default async function loginUser(email, pwd){
    const auth = getAuth()
    try {
        //signed in
        const user = await signInWithEmailAndPassword(auth, email, pwd)
        return true
    } catch (error) {
        return error.message
    }
}

import { supabase } from "@/app/supabase/initiliaze";

export default async function loginUser(email, pwd) {
    const {error} = await supabase.auth.signInWithPassword({email, pwd});
    if (error) {
        console.error("Error occured", error.message);
        return;
    }
}*/

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { supabase } from "@/app/supabase/initiliaze";

export default async function loginUser(email, pwd) {
    const auth = getAuth()
    try {
        // Signed in with Firebase
        const user = await signInWithEmailAndPassword(auth, email, pwd)

        // Create session in Supabase
        const { error } = await supabase.auth.signInWithPassword({ email, password: pwd })

        if (error) {
            throw error
        }

        return true  // Session created successfully in both Firebase and Supabase
    } catch (error) {
        return error.message
    }
}
