import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from "@react-navigation/drawer";
import findmentors from "@/app/findmentors";
import home from  "./home";
import {Slot} from "expo-router";

const Drawer = createDrawerNavigator();

export default function drawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={home} />
                <Drawer.Screen name="Find Mentors" component={findmentors} />
                <Drawer.Screen name="index" component={Slot} options={{ title: "Home" }} />
                <Drawer.Screen name="findmentors" component={Slot} options={{ title: "Find Mentors" }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}