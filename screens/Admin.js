//import { NavigationContainer } from "@react-navigation/native";
import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as firebase from "firebase";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";

export default function Admin({ navigation }) {
  const [loading, setLoading] = useState(false);

  const onLogout = () => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        //setLoading(false);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (loading == true) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Panel</Text>
        </View>
        <View style={styles.secondCircle}></View>
      </View>

      <View style={{flex: 1,}}>
        <View style={styles.tw}>
          <Text style={styles.t}>View Users List</Text>
        </View>

        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("UserList")}
          >
            <Image
              source={require("../assets/group.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={() => onLogout()}>
            <Text style={{ fontFamily: "M", color: "#fff",fontSize: rfp(2), }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerWrapper: {
    height: hp("50%"),
    //backgroundColor: 'red',
  },
  header: {
    width: wp("100%"),
    height: hp("45%"),
    backgroundColor: "#4C525C",
    borderBottomLeftRadius: wp("80%"),
    borderBottomRightRadius: wp("80%"),
    transform: [{ scaleX: 1.1 }],
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    //fontSize: 25,
    fontSize: rfp(3.5),
    fontFamily: "M",
    //left: wp('17%'),
    //top: hp('2%'),
  },
  secondCircle: {
    width: wp("50%"),
    height: wp("50%"),
    backgroundColor: "#58BFE6",
    borderRadius: wp("100%"),
    position: "absolute",
    right: -wp("25%"),
    bottom: hp("2%"),
    zIndex: -1,
    transform: [{ scale: 1.2 }],
  },

  tw: {
    width: wp("100%"),
    height: hp("15%"),
    //backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    //flexDirection: 'row',
    justifyContent: "center",
  },
  t: {
    color: "black",
    //fontSize: 20,
    fontSize: rfp(3),
    fontFamily: "B",
  },

  optionWrapper: {
    flex: 1,
    //flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor: "green",
  },
  option: {
    width: wp("25%"),
    height: wp("25%"),
    //backgroundColor: "#4C525C",
    //borderRadius: 100,
    //overflow: 'hidden',
    //alignItems: "center",
    //justifyContent: "center",
  },
  optiontext: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "M",
  },
  logout: {
    width: wp("30%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#4C525C",
  },
});
