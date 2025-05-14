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