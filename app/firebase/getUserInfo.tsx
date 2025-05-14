import { getAuth } from 'firebase/auth'

export default function UserInfo(){
    const auth = getAuth();
    const currentUser = auth.currentUser
    if(currentUser){
        const User = {
            name: currentUser.displayName,
            uid: currentUser.uid, 
            photoUrl: currentUser.photoURL
        }
        return User
    }
    return false
}

