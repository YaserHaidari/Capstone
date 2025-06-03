import {View, Text, TextInput, Image, ScrollView} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomHeader from "@/components/CustomHeader";

function FindMentorsScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
        <CustomHeader />
      <View className='flex-row self-center items-center mt-4 p-2 w-5/6 rounded-full'>
        <Ionicons name='search' size={20} className='ml-2' color="black" />
        <TextInput
        placeholder='Search'
        className='text-lg ml-2'
        />
        <Ionicons name='filter-sharp' size={20} className='ml-auto mr-4' color="black" />
      </View>

      <Text style={{ fontFamily: "OpenSans-Bold" }} className='text-xl mt-4 ml-8'>
        Recommended Mentors
      </Text>
      <View className="flex-row mt-4 mx-8 gap-4">
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/20"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/40"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/60"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/80"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
      </View>

      <Text style={{ fontFamily: "OpenSans-Bold" }} className='text-xl mt-4 ml-8'>
        Mentors Near You
      </Text>
      <View className="flex-row mt-4 mx-8 gap-4">
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/20"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/40"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/60"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/80"}}
          style={{ width: 80, height: 80 }}
          className="rounded-full border-2 border-gray-200"
        />
      </View>

      <Text style={{ fontFamily: "OpenSans-Bold" }} className='text-xl mt-4 ml-8'>
        Recent Projects
      </Text>
      <View className="flex-row mt-4 mx-8 border border-gray-400 rounded-lg p-4">
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/57"}}
          style={{ width: 60, height: 60 }}
          className="rounded-full border-2 border-gray-200"
        />
        <View className="flex-col w-72 ml-4 gap-2">
          <Text style={{ fontFamily: "OpenSans-Bold" }}>
            "This is a sample project title"
          </Text>
          <Text style={{ fontFamily: "OpenSans-Regular" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>

      <View className="flex-row mt-4 mx-8 border border-gray-400 rounded-lg p-4">
        <Image
          source={{uri: "https://avatar.iran.liara.run/public/74"}}
          style={{ width: 60, height: 60 }}
          className="rounded-full border-2 border-gray-200"
        />
        <View className="flex-col w-72 ml-4 gap-2">
          <Text style={{ fontFamily: "OpenSans-Bold" }}>
            "This is a sample project title"
          </Text>
          <Text style={{ fontFamily: "OpenSans-Regular" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default FindMentorsScreen;