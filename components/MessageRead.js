import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import BottomMenu from "../components/BottomMenu";

export default function MessageRead(props) {
  return (
    <View style={styles.middata2}>
      <TouchableOpacity
        style={styles.img1}
        onPress={() => props.navigation.navigate("UserProfile")}
      >
        <Image
          source={require("../assets/user.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textdata}
        onPress={() => props.navigation.navigate("Chat")}
      >
        <View style={styles.name}>
          <Text style={styles.nametext}>Shafique</Text>
          {/* <View style={styles.namecircle}></View>
                <Text style={styles.nametext2}>4m ago</Text> */}
        </View>
        <View style={styles.name2}>
          <Text style={styles.name2text}>ABCDABCDABCDAABCD</Text>
          <View style={styles.namecircle}></View>
          <Text style={styles.nametext2}>18m ago</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.img22}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  middata2: {
    //backgroundColor: '#fff',
    backgroundColor: "rgba(88, 191, 230, 0.1)",
    //backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: "row",
    width: wp("100%"),
    height: hp("9%"),
    borderRadius: wp("5%"),
    justifyContent: "space-around",
    alignItems: "center",
    //marginTop: wp('1%'),
    borderBottomWidth: 0.5,
    borderBottomColor: "#4C525C",
  },

  img1: {
    //backgroundColor: "red",
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: 100,
    borderColor: "#58BFE6",
    borderWidth: 1,
    overflow: "hidden",
    //marginLeft: wp('1%'),
    //marginRight: wp('1%'),
  },

  img22: {
    //backgroundColor: '#58BFE6',
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("2%"),
    //marginLeft: wp('1%'),
    //marginRight: wp('1%'),
    alignItems: "center",
    justifyContent: "center",
  },

  textdata: {
    //backgroundColor: 'blue',
    width: wp("70%"),
    height: wp("12%"),
    //alignItems: 'center',
  },
  name: {
    //backgroundColor: 'yellow',
    width: wp("68%"),
    height: wp("7%"),
    //flexDirection: 'row',
    justifyContent: "center",
    //alignItems: 'center',
    //marginLeft: wp('1%'),
  },
  nametext: {
    //fontSize: 16,
    fontSize: rfp(2.2),
    fontFamily: "B",
  },
  name2: {
    //backgroundColor: 'pink',
    width: wp("68%"),
    height: wp("5%"),
    flexDirection: "row",
    //justifyContent: 'flex-start',
    alignItems: "center",
    //marginLeft: wp('1%'),
  },
  namecircle: {
    backgroundColor: "#9797BD",
    width: wp("1.5%"),
    height: wp("1.5%"),
    borderRadius: wp("100%"),
    marginLeft: wp("2%"),
  },
  nametext2: {
    //fontSize: 11,
    fontSize: rfp(1.5),
    color: "#9797BD",
    marginLeft: wp("2%"),
    fontFamily: "R",
  },
  name2text: {
    color: "#9797BD",
    //fontSize: 13,
    fontSize: rfp(1.7),
    fontFamily: "R",
  },
});
