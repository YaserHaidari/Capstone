import { useEffect, useState } from "react";
import {View, Text, Image, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform}
    from "react-native";
import loginUser from './firebase/loginUser'
import { useRouter } from "expo-router";
 
export default function RegisterScreen() {

  const [email, setEmail] = useState<String>('')
  const [pwd, setPwd] = useState<String>('')
  const [message, setMessage] = useState<String>('')
  //fetching router accessbility
  const router = useRouter()

  //logging user on button click and if successful navigate to home otherwise show error message
  async function handleForm() {
    const result = await loginUser(email, pwd);
    if(typeof(result) == "boolean"){
       router.replace({
        pathname: '/home',
        params:{
          email: email,
          password: pwd
        }
       })
    }else {
        setMessage(result)
    }

}

    function navigaToRegister() {
        router.push("/register");
    }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust this offset if needed
          className="flex-1 bg-white"
      >
          <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
          >
            <Text
                className="text-4xl font-bold font-Title text-black text-center pt-5 pb-14">Coffee Meets Careers
            </Text>
            <Text className="text-4xl font-Menu text-center">Login</Text>
            <Text className="text-lg font-Menu text-center pb-14">Sign in to continue</Text>
            <Text className="text-base font-bold font-Menu pl-11">Email</Text>
            <View className="flex-row items-center bg-gray-200 mx-10 px-4 rounded-lg h-14 mb-16">
                <TextInput
                    className="flex-1 text-base font-Text text-gray-800"
                    placeholder="someone@example.com" onChangeText={(email) => setEmail(email)}
                />
            </View>

            <Text className="text-base font-bold font-Menu pl-11">Password</Text>
            <View className="flex-row items-center bg-gray-200 mx-10 px-4 rounded-lg h-14 mb-20">
                <TextInput
                    className="flex-1 text-base font-Text text-black"
                    placeholder="Password" onChangeText={(pwd) => setPwd(pwd)}
                />
            </View>


            <View className="mb-32">
                <TouchableOpacity
                    onPress={handleForm}
                    className="flex-row bg-primary mx-10 px-4 rounded-lg h-14 items-center justify-center"
                >
                    <Text className="text-2xl font-Menu text-white font-medium ">Log In</Text>
                </TouchableOpacity>
                {message && (
                    <Text className="text-center text-red-600 mt-4 text-sm">{message} Please Try Again</Text>
                )}
            </View>

            <View>
                <TouchableOpacity onPress={navigaToRegister}>
                    <Text className="text-lg font-Menu text-center text-gray-500">
                        Register Account
                    </Text>
                </TouchableOpacity>
            </View>

          </ScrollView>
      </KeyboardAvoidingView>
  );
}