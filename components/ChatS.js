//import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";

export default function ChatS(props) {
  return (
    <View style={styles.crow}>
      <View style={styles.ctext2}>
        <View style={styles.ctime}>
          <Text style={{ fontFamily: "L", fontSize: rfp(1.4) }}>
            {props.data.time}
          </Text>
        </View>
        <View style={styles.msg2}>
          <Text style={{ fontFamily: "R", color: "#fff", fontSize: rfp(2) }}>
            {props.data.msg}
          </Text>
        </View>
      </View>
      <View style={styles.cpic}>
        <View style={styles.pic}>
          <Image
            source={{ uri: props.profile }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  crow: {
    width: wp("90%"),
    //height: hp("10%"),
    //backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: hp("1%"),
    //alignItems: 'center',
  },
  cpic: {
    width: wp("10%"),
    //height: hp("10%"),
    //backgroundColor: 'blue',
    //flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pic: {
    width: wp("8%"),
    height: wp("8%"),
    //backgroundColor: "red",
    borderRadius: wp("100%"),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#58BFE6",
    //flexDirection: 'row',
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  ctime: {
    //width: wp("30%"),
    //height: hp("3%"),
    width: wp("15%"),
    //backgroundColor: 'pink',
    alignItems: "center",
    justifyContent: "center",
  },
  ctext2: {
    //width: wp("80%"),
    //height: hp("10%"),
    maxWidth: wp("75%"),
    //backgroundColor: "orange",
    flexDirection: "row",
    //justifyContent: 'center',
    //alignItems: "flex-end",
    paddingHorizontal: wp("1%"),
    //paddingVertical: wp('1%'),
  },
  msg2: {
    maxWidth: wp("60%"),
    //width: wp("25%"),
    //height: hp("4%"),
    //backgroundColor: 'yellow',
    backgroundColor: "#58BFE6",
    //flexDirection: 'row',
    //justifyContent: 'center',
    paddingHorizontal: wp("1%"),
    paddingVertical: wp("1%"),
    //alignItems: 'center',
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "#fff",
  },
});
