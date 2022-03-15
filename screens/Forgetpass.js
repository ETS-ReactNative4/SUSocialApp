//import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import * as firebase from "firebase";

export default function Forgetpass({ navigation }) {
  const [email = "", setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const resetpass = () => {
    setLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail("");
        alert("Password reset email has been sent");
        setLoading(false);
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
        // ..
      });
  };

  if (loading) {
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
          <View style={styles.backbutton}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="back" size={wp("6%")} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={styles.titletext}>Forget{"\n"}Password</Text>
          </View>
        </View>
        <View style={styles.secondCircle}></View>
      </View>
      <ScrollView>
        <View style={styles.mid}>
          <View style={styles.box}>
            <TextInput
              value={email}
              placeholder="Email"
              style={{ flex: 1, fontSize: rfp(2), fontFamily: "M" }}
              onChangeText={(val) => setEmail(val)}
            />
          </View>
          <View style={styles.box2}>
            <Text style={styles.boxtext2}>Reset Password</Text>
            <TouchableOpacity style={styles.button} onPress={() => resetpass()}>
              <AntDesign name="arrowright" size={wp("6%")} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    //justifyContent: 'center',
    alignItems: "center",
    //paddingVertical:hp('5%')
  },
  backbutton: {
    width: wp("88%"),
    height: hp("9%"),
    //backgroundColor: 'red',
    //borderRadius: wp('100%'),
    justifyContent: "center",
    //alignItems: 'center',
  },
  touch: {
    width: wp("15%"),
    height: wp("15%"),
    //backgroundColor: 'yellow',
    borderRadius: wp("100%"),
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: wp("76%"),
    height: hp("30%"),
    justifyContent: "center",
    //backgroundColor: 'pink',
  },
  titletext: {
    color: "#fff",
    //fontSize: 25,
    fontSize: rfp(3.5),
    fontFamily: "M",
    //left: wp('17%'),
    //top: hp('2%')
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
  mid: {
    height: hp("35%"),
    //flex:1,
    //flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    //backgroundColor: 'green',
    //marginTop: hp('2%'),
  },
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    //opacity: 0.2,
    height: wp("14%"),
    width: wp("80%"),
    //marginTop: hp('2%'),
    borderRadius: wp("6%"),
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
  },
  box2: {
    //backgroundColor: 'red',
    height: wp("15%"),
    width: wp("80%"),
    //marginTop: hp('4%'),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  boxtext2: {
    //fontSize: 25,
    fontSize: rfp(3.5),
    color: "black",
    fontFamily: "M",
    //marginLeft: wp('3%'),
  },
  button: {
    backgroundColor: "#4C525C",
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
