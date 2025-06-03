import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './home';
import Notifications from './notifications';
import Cybermatch from './cybermatch';
import Profile from './profile';

const Tab = createBottomTabNavigator();

export default function tabsNavigation() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
        }}
      />
      <Tab.Screen
        name="Cybermatch"
        component={Cybermatch}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
