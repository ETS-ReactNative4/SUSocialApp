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

export default function SignupB({ navigation }) {
  return (
    <View style={styles.bottomw}>
      <View style={styles.bottom}>
        <View style={styles.botcircle}>
          {/* <Text style={styles.bboxtext}>Sign In</Text>
            <View style={styles.bbox2}></View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  bottomw: {
    //width: wp("100%"),
    //height: hp("15%"),
    //position:'absolute',
    //bottom:0,
    flex: 1,
    //backgroundColor: 'red',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  bottom: {
    width: wp("100%"),
    //height: hp("1%"),
    flex: 1,
    //backgroundColor: '#4C525C',
    //borderTopLeftRadius: wp('100%'),
    //borderTopRightRadius: wp('100%'),
    //borderRadius: wp('100%'),
    //flex: 1,
    //flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  botcircle: {
    width: wp("35%"),
    height: hp("15%"),
    //flex: 1,
    backgroundColor: "#fff",
    //borderRadius: wp('100%'),
    //borderBottomRightRadius: wp('100%'),
    borderTopLeftRadius: wp("100%"),
    //borderTopRightRadius: wp('100%'),
    //position:'absolute',
    //right: -wp('25%'),
    //bottom:hp('5%'),
    //zIndex: -1,
    //transform:[{scaleX:1.1}]
    alignItems: "center",
    justifyContent: "center",
  },
  bbox2: {
    backgroundColor: "#58BFE6",
    width: wp("25%"),
    height: wp("2%"),
    //marginRight: wp('5%'),
    //marginTop: hp('10%'),
    //alignItems: 'center',
  },
  bboxtext: {
    fontSize: 18,
    color: "black",
    //marginTop: -hp('2%'),
  },
});
