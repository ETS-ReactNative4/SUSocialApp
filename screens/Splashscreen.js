//import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";

export default function Splashscreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/gate.jpg")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.2,
          flex: 1,
          position: "absolute",
          zIndex: 0,
        }}
      />
      <View style={styles.s1}>
        <Text style={styles.text}>Sindh University</Text>
        <Text style={styles.text}>Social App</Text>
      </View>
      <View style={styles.s2}>
        <View style={styles.logo}>
          <Image
            source={require("../assets/statue.jpg")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#58BFE6",
    overflow: "hidden",
  },
  text: {
    //fontSize: 40,
    fontSize: rfp(5.5),
    color: "#4C525C",
    fontFamily: "B",
  },
  logo: {
    width: wp("50%"),
    height: wp("50%"),
    borderRadius: wp("100%"),
    //backgroundColor: "red",
    borderWidth: 2,
    borderColor: "#4C525C",
    overflow: "hidden",
  },
  s1: {
    //height: hp("45%"),
    //width: wp("100%"),
    //backgroundColor: 'green',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  s2: {
    //height: hp("55%"),
    //width: wp("100%"),
    //backgroundColor: 'yellow',
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
  },
});
