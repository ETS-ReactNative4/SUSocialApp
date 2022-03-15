import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Comment from "../screens/Comment";
import Newsfeed from "../screens/Newsfeed";
import Privatefeed from "../screens/Privatefeed";
import Notification from "../screens/Notification";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import Editprofile from "../screens/Editprofile";
import Chat from "../screens/Chat";
import Post from "../screens/Post";
import Search from "../screens/Search";
import ImageView from "../screens/ImageView";
//import Admin from "../screens/Admin";
//import UserList from "../screens/UserList";
//import AdminEdit from "../screens/AdminEdit";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Newsfeed" component={Newsfeed} />
    <Screen name="Privatefeed" component={Privatefeed} />
    <Screen name="Comment" component={Comment} />
    <Screen name="Profile" component={Profile} />
    <Screen name="UserProfile" component={UserProfile} />
    <Screen name="Messages" component={Messages} />
    <Screen name="Editprofile" component={Editprofile} />
    <Screen name="Notification" component={Notification} />
    <Screen name="Chat" component={Chat} />
    <Screen name="Post" component={Post} />
    <Screen name="Search" component={Search} />
    <Screen name="ImageView" component={ImageView} />

    {/* <Screen name="Admin" component={Admin} />
    <Screen name="UserList" component={UserList} />
    <Screen name="AdminEdit" component={AdminEdit} /> */}
  </Navigator>
);

export const AuthNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
