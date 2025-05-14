import { View, Text, Image, StyleSheet, Button } from "react-native"

export default function ProfileScreen()
{
  // Style for the profile avatar.
  const styles = StyleSheet.create({
    ProfileAvatar: {
      width: 100,
      height: 100,
      marginBottom: 10,
    }
  });

  return (
    <View className="container bg-gray-100">
      {/* Profile avatar including background color */}
      <View className="bg-sky-600 w-screen p-4 mb-4 items-center shadow-md">
        <Image 
          style={styles.ProfileAvatar}
          className="rounded-full border-4 border-gray-100 shadow-md"
          source={{uri:'https://avatar.iran.liara.run/public/41'}}
        />
      </View>

      {/* Profile details with hard-coded text */}
      <View className="p-4 w-5/6 mx-auto">
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="text-xl font-bold mb-2">
          Name
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="p-4 bg-gray-200 border border-gray-500 rounded-lg shadow-md text-lg mb-4">
          Jeff
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="text-xl font-bold mb-2">
          Role
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="p-4 bg-gray-200 border border-gray-500 rounded-lg shadow-md text-lg mb-4">
          Student
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="text-xl font-bold mb-2">
          Date of Birth
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="p-4 bg-gray-200 border border-gray-500 rounded-lg shadow-md text-lg mb-4">
          1998/01/01
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="text-xl font-bold mb-2">
          Email
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="p-4 bg-gray-200 border border-gray-500 rounded-lg shadow-md text-lg mb-4">
          jeff@student.school.edu.au
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="text-xl font-bold mb-2">
          Location
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular' }} className="p-4 bg-gray-200 border border-gray-500 rounded-lg shadow-md text-lg mb-12">
          Melbourne
        </Text>

        {/* Log out button with no functionality yet */}
        <Button
          onPress={() => alert('Successfully logged out!')}
          title="Log Out"
          color="#fb2c36"
        />
      </View>
    </View>
  )
}