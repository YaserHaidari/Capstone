import { View, Text, Image, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function CyberMatchScreen() {
  return (
    <View>
      <Text
        style={{ fontFamily: "OpenSans-Regular" }}
        className="w-5/6 self-center text-xl text-center mt-8"
      >
        Based on your interests, we recommend the following mentors:
      </Text>

      <View className="flex-row mt-4 mx-8 border border-gray-400 rounded-lg p-4">
        <View className="flex-col gap-2">
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/35" }}
            style={{ width: 60, height: 60 }}
            className="rounded-full border-2 border-gray-200"
          />
          <Ionicons name="bookmark-outline" size={24} className="self-center" />
        </View>
        <View className="flex-col w-72 ml-4 gap-2">
          <Text style={{ fontFamily: "OpenSans-Bold" }}>John Doe</Text>
          <Text style={{ fontFamily: "OpenSans-Regular" }} className="mb-2">
            Cybersecurity Expert
          </Text>
          <Button
            title="Request Mentorship"
            onPress={() => alert("Mentorship request sent!")}
            color="#155dfc"
          />
        </View>
      </View>

      <View className="flex-row mt-4 mx-8 border border-gray-400 rounded-lg p-4">
        <View className="flex-col gap-2">
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/67" }}
            style={{ width: 60, height: 60 }}
            className="rounded-full border-2 border-gray-200"
          />
          <Ionicons name="bookmark-outline" size={24} className="self-center" />
        </View>
        <View className="flex-col w-72 ml-4 gap-2">
          <Text style={{ fontFamily: "OpenSans-Bold" }}>Jane Smith</Text>
          <Text style={{ fontFamily: "OpenSans-Regular" }} className="mb-2">
            Cybersecurity Analyst
          </Text>
          <Button
            title="Request Mentorship"
            onPress={() => alert("Mentorship request sent!")}
            color="#155dfc"
          />
        </View>
      </View>

      <View className="flex-row mt-4 mx-8 border border-gray-400 rounded-lg p-4">
        <View className="flex-col gap-2">
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/84" }}
            style={{ width: 60, height: 60 }}
            className="rounded-full border-2 border-gray-200"
          />
          <Ionicons name="bookmark-outline" size={24} className="self-center" />
        </View>
        <View className="flex-col w-72 ml-4 gap-2">
          <Text style={{ fontFamily: "OpenSans-Bold" }}>Paula Johnson</Text>
          <Text style={{ fontFamily: "OpenSans-Regular" }} className="mb-2">
            Network Security Specialist
          </Text>
          <Button
            title="Request Mentorship"
            onPress={() => alert("Mentorship request sent!")}
            color="#155dfc"
          />
        </View>
      </View>
    </View>
  );
}

export default CyberMatchScreen;
