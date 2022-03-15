//import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import * as firebase from "firebase";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function UserListCard(props) {
  const user = firebase.auth().currentUser;
  var db = firebase.firestore();

  const onEdit = () => {
    //alert("Edit");
    props.navigation.navigate("AdminEdit",{id:props.id});
  };

  const onDisable = () => {
    db.collection("users").doc(props.id).update({ active: "false" });
  };

  const onEnable = () => {
    db.collection("users").doc(props.id).update({ active: "true" });
  };

  return (
    <View style={styles.profile}>
      <View style={styles.profilepic}>
        <Image
          //source={require("../assets/profile.jpg")}
          source={{ uri: props.data.profile }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.profilename}>
        <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
          {props.data.name}
        </Text>
        <Text style={{ fontFamily: "L", fontSize: rfp(2) }}>
          {props.data.occupation}
        </Text>
      </View>
      <Menu>
        <MenuTrigger>
          <View style={styles.midicon}>
            <SimpleLineIcons
              name="options-vertical"
              size={wp("4%")}
              color="white"
            />
          </View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            marginLeft: -wp("4%"),
            marginTop: hp("4%"),
            width: wp("37%"),
            height: wp("25%"),
            borderRadius: wp("5%"),
            //backgroundColor: "#d11a2a",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "white",
          }}
        >
          <MenuOption onSelect={() => onEdit()}>
            <View
              style={{
                width: wp("33%"),
                height: wp("10%"),
                borderRadius: wp("5%"),
                backgroundColor: "#58BFE6",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "white",
              }}
            >
              <Text
                style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}
              >
                Edit Profile
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              props.data.active == "true"
                ? Alert.alert(
                    "Confirmation",
                    "Are you sure you want to disable this user?",
                    [
                      {
                        text: "NO",
                      },
                      { text: "YES", onPress: () => onDisable() },
                    ]
                  )
                : Alert.alert(
                    "Confirmation",
                    "Are you sure you want to enable this user?",
                    [
                      {
                        text: "NO",
                      },
                      { text: "YES", onPress: () => onEnable() },
                    ]
                  );
            }}
          >
            <View
              style={{
                width: wp("33%"),
                height: wp("10%"),
                borderRadius: wp("5%"),
                backgroundColor: "#d11a2a",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "white",
              }}
            >
              <Text
                style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}
              >
                {props.data.active == "true"
                  ? "Disable Account"
                  : "Enable Account"}
              </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
      {/* <TouchableOpacity style={styles.midicon}>
        <SimpleLineIcons
          name="options-vertical"
          size={wp("4%")}
          color="white"
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: wp("90%"),
    height: hp("10%"),
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: wp("2%"),
    borderRadius: wp("5%"),
    //borderWidth: 1,
    //borderColor: "#58BFE6",
  },
  profilepic: {
    width: wp("17%"),
    height: wp("17%"),
    //backgroundColor: "red",
    borderRadius: wp("100%"),
    borderColor: "#58BFE6",
    borderWidth: 1,
    overflow: "hidden",
  },
  profilename: {
    width: wp("62%"),
    height: hp("10%"),
    //backgroundColor: 'yellow',
    justifyContent: "space-evenly",
  },
  midicon: {
    backgroundColor: "#58BFE6",
    width: wp("6%"),
    height: hp("5%"),
    borderRadius: wp("2%"),
    //marginLeft: wp('1%'),
    //marginRight: wp('1%'),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#4C525C",
  },
});
