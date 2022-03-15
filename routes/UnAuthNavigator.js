import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../screens/Signin";
import Role from "../screens/Role";
import Signup from "../screens/Signup";
import Forgetpass from "../screens/Forgetpass";
import Signup2 from "../screens/Signup2";
import TSignup from "../screens/TSignup";
import TSignup2 from "../screens/TSignup2";
import Signup3 from "../screens/Signup3";
import Splashscreen from "../screens/Splashscreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    {/* <Screen name="Splashscreen" component={Splashscreen} /> */}
    <Screen name="Role" component={Role} />
    <Screen name="Signin" component={Signin} />
    <Screen name="Forgetpass" component={Forgetpass} />
    <Screen name="Signup" component={Signup} />
    <Screen name="Signup2" component={Signup2} />
    <Screen name="TSignup" component={TSignup} />
    <Screen name="TSignup2" component={TSignup2} />
    <Screen name="Signup3" component={Signup3} />
    {/* <Screen name="Splashscreen" component={Splashscreen} /> */}
  </Navigator>
);

export const UnAuthNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
