import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export async function createUser(email, password, name) {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const {user} = userCredential
        user.displayName = name
        return "successful"; // Return "successful" if the user is created
    } catch (error) {
        return error.message; // Return the error message if there's an error
    }
}