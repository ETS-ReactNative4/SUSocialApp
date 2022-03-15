import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage as rfp, RFValue as rfv } from "react-native-responsive-fontsize";
import BottomMenu from "../components/BottomMenu";
import NewsFeedCard from "../components/NewsFeedCard";

export default function TopMenu({ navigation }) {
  return (
    <View style={styles.headerw}>
      <View style={styles.header}>
        <View style={styles.headerdata}>
          <View style={styles.headericon}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.headertext}>
            <Text style={styles.htitle}>SU Social App</Text>
          </View>
          <TouchableOpacity
            style={styles.headericon2}
            onPress={() => navigation.navigate("Search")}
          >
            <AntDesign name="search1" size={wp('5%')} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerw: {
    height: StatusBar.currentHeight + hp("10%"),
    paddingTop: StatusBar.currentHeight,
    //height: hp("13%"),
    width: wp("100%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4C525C",
    borderBottomLeftRadius: wp("10%"),
    borderBottomRightRadius: wp("10%"),
  },
  header: {
    //paddingTop: StatusBar.currentHeight,
    //backgroundColor: "#4C525C",
    width: wp("100%"),
    //height: StatusBar.currentHeight + hp("10%"),
    height: hp("10%"),
    //justifyContent: 'center',
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'red',
    //borderBottomLeftRadius: wp("10%"),
    //borderBottomRightRadius: wp("10%"),
    //flexDirection: 'row',
  },
  headerdata: {
    //backgroundColor: 'blue',
    width: wp("90%"),
    height: hp("10%"),
    //height: hp('20%'),
    justifyContent: "space-around",
    alignItems: "center",
    //borderBottomLeftRadius: wp('5%'),
    //borderBottomRightRadius: wp('5%'),
    flexDirection: "row",
  },
  headericon: {
    width: wp("16%"),
    height: wp("16%"),
    //borderRadius: wp("100%"),
    //backgroundColor: "red",
    //overflow: "hidden",
  },
  headertext: {
    //backgroundColor: 'pink',
    width: wp("65%"),
    height: hp("10%"),
    justifyContent: "center",
  },
  htitle: {
    //fontSize: 25,
    fontSize: rfp(3.5),
    //color: "#58BFE6",
    color: "#fff",
    fontFamily: "B",
  },
  headericon2: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
});
