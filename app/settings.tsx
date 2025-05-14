import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function SettingsScreen() {
  return (
    <View>
      <View className='flex-row self-center items-center mt-4 p-2 bg-gray-200 w-5/6 rounded-full'>
        <Ionicons name='search' size={20} className='ml-2' color="black" />
        <TextInput
          placeholder='Search'
          className='text-lg ml-2'
        />
      </View>

      <Text className='text-xl font-bold mt-4 ml-8'>
        Account Details
      </Text>
      <TouchableOpacity className='flex-row self-center items-center mt-4 p-4 border border-gray-600 w-5/6 rounded-t-lg'>
          <Fontisto name='email' size={30} className='ml-2' color="black" />
          <Text className='text-lg ml-4'>
            Email Address
          </Text>
          <AntDesign name='right' size={20} className='ml-auto' color="black" />
      </TouchableOpacity>
      <TouchableOpacity className='flex-row self-center items-center p-4 border-x border-gray-600 w-5/6'>
          <MaterialIcons name='password' size={30} className='ml-2' color="black" />
          <Text className='text-lg ml-4'>
            Password
          </Text>
          <AntDesign name='right' size={20} className='ml-auto' color="black" />
      </TouchableOpacity>
      <TouchableOpacity className='flex-row self-center items-center p-4 border border-gray-600 w-5/6 rounded-b-lg'>
          <Fontisto name='date' size={30} className='ml-2' color="black" />
          <Text className='text-lg ml-4'>
            Date of Birth
          </Text>
          <AntDesign name='right' size={20} className='ml-auto' color="black" />
      </TouchableOpacity>

      <Text className='text-xl font-bold mt-4 ml-8'>
        Account Privacy
      </Text>
      <TouchableOpacity className='flex-row self-center items-center mt-4 p-4 border border-gray-600 w-5/6 rounded-t-lg'>
          <Ionicons name='notifications-outline' size={30} className='ml-2' color="black" />
          <Text className='text-lg ml-4'>
            Notifications
          </Text>
          <AntDesign name='right' size={20} className='ml-auto' color="black" />
      </TouchableOpacity>
      <TouchableOpacity className='flex-row self-center items-center p-4 border-x border-b border-gray-600 w-5/6 rounded-b-lg'>
          <Ionicons name='location-outline' size={30} className='ml-2' color="black" />
          <Text className='text-lg ml-4'>
            Location
          </Text>
          <AntDesign name='right' size={20} className='ml-auto' color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;