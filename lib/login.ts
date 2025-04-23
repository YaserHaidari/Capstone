
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      return 'Please verify your email before logging in.';
    }

    return true;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return 'No account found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      return 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }

    return error.message || 'Something went wrong. Try again.';
  }
}
