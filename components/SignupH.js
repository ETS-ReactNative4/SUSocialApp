import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";

export default function SignupH({ navigation }) {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <View style={styles.backbutton}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={wp('6%')} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text style={styles.titletext}>Create{"\n"}Account</Text>
        </View>
      </View>
      {/* <View style={styles.secondCircle}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: hp("40%"),
    //backgroundColor: 'red',
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    height: wp("70%"),
    backgroundColor: "#4C525C",
    //borderRadius: wp('100%'),
    //borderBottomLeftRadius: wp('100%'),
    borderBottomRightRadius: wp("100%"),
    //borderTopRightRadius: wp('100%'),
    //transform: [{ scaleX: 1.1 }],
    //transform: [{ scaleY: 1.1 }],
    //justifyContent: 'center'
  },
  backbutton: {
    //backgroundColor: 'red',
    width: wp("95%"),
    height: hp("10%"),
    //alignItems: 'center',
    justifyContent: "center",
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
    //backgroundColor: 'pink',
    width: wp("85%"),
    height: hp("25%"),
    justifyContent: "center",
    //alignItems: 'center',
  },
  titletext: {
    color: "#fff",
    //fontSize: 25,
    fontSize: rfp(3.5),
    fontFamily: "M",
    //left: wp('17%'),
    //top: hp('2%')
  },
});
