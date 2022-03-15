//import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";

export default function Role({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Role</Text>
        </View>
        <View style={styles.secondCircle}></View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.tw}>
          <Text style={styles.t}>Teacher</Text>
          <Text style={styles.t}>Student</Text>
          <Text style={styles.t}>Admin</Text>
        </View>

        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Signin", { role: "teacher" })}
          >
            <Image
              source={require("../assets/teacher.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Signin", { role: "student" })}
          >
            <Image
              source={require("../assets/student.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Signin", { role: "admin" })}
          >
            <Image
              source={require("../assets/admin.png")}
              style={{ width: "100%", height: "100%" }}
            />
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
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  t: {
    color: "black",
    //fontSize: 20,
    fontSize: rfp(3),
    fontFamily: "M",
  },

  optionWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    //backgroundColor: 'green',
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
});
