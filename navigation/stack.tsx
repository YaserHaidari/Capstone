import { Stack } from "expo-router"
function StackScreen(){
    return(
        <Stack>
            <Stack.Screen name="Register" options={{title: "Register"}} />
            <Stack.Screen name="Home" options={{title: "Home"}} />
        </Stack>
    )
}


export default StackScreen
