import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Admin from "../screens/Admin";
import UserList from "../screens/UserList";
import AdminEdit from "../screens/AdminEdit";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    {/* <Screen name="AdminEdit" component={AdminEdit} /> */}
    <Screen name="Admin" component={Admin} />
    <Screen name="UserList" component={UserList} />
    <Screen name="AdminEdit" component={AdminEdit} />
  </Navigator>
);

export const AdminNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
