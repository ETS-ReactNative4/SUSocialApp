//import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Test({navigation}) {
  return (
        <View style={styles.container}>
            <View style={styles.vv}>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Signin")}><Text>Sign In</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Signup")}><Text>Sign Up</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Role")}><Text>Role</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Comment")}><Text>Comment</Text></TouchableOpacity>
            </View>
            <View style={styles.vv}>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Messages")}><Text>Messages</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Notification")}><Text>Notification</Text></TouchableOpacity>  
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Profile")}><Text>Profile</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Editprofile")}><Text>Edit Profile</Text></TouchableOpacity>
            </View>
            <View style={styles.vv}>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Forgetpass")}><Text>Forgetpass</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Chat")}><Text>Chat</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Splashscreen")}><Text>Splash Screen</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Newsfeed")}><Text>Newsfeed</Text></TouchableOpacity>
            </View>
            <View style={styles.vv}>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Post")}><Text>Post</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Search")}><Text>Search Screen</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("Admin")}><Text>Admin</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("UserList")}><Text>User List</Text></TouchableOpacity>
            </View>
            <View style={styles.vv}>
                <TouchableOpacity style={styles.circle} onPress={()=>navigation.navigate("AdminEdit")}><Text>Admin Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle}><Text>Pending</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle}><Text>Pending</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circle}><Text>Pending</Text></TouchableOpacity>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  vv:{
      width: wp('100%'),
      height: hp('20%'),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  circle:{
      width: wp('25%'),
      height: wp('25%'),
      borderRadius: 100,
      backgroundColor: 'yellow',
      //flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },

});
