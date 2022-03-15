//import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";

export default function SearchCard(props) {
  //console.log(props.user);
  return (
    <TouchableOpacity
      style={styles.profile}
      onPress={() => (
        <>
          {props.id == props.user
            ? props.navigation.navigate("Profile", { uid: props.data })
            : props.navigation.navigate("UserProfile", { uid: props.id })}
        </>
      )}
    >
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
    </TouchableOpacity>
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
    width: wp("68%"),
    height: hp("10%"),
    //backgroundColor: 'yellow',
    justifyContent: "space-evenly",
  },
});
