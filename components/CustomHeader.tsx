// components/CustomHeader.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function CustomHeader() {
    const navigation = useNavigation();

    return (
        <View className="h-16 px-4 bg-white flex-row items-center">
            <TouchableOpacity className="flex-row items-center"
                              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <AntDesign className="mr-2" name="menu-fold" size={21} color="black" />
                <Text className="text-lg font-semibold font-Menu">Menu</Text>
            </TouchableOpacity>
        </View>
    );
}
