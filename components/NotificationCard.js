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
import BottomMenu from "../components/BottomMenu";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

export default function NotificationCard(props) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  //console.log(props.data);
  return (
    <TouchableOpacity
      style={styles.middata}
      onPress={() =>
        props.navigation.navigate("Comment", {
          cid: props.data.postId,
          cdata: { images: props.data.postImage },
        })
      }
    >
      <View style={styles.img1}>
        <Image
          //source={require("../assets/user.png")}
          source={{ uri: props.data.profile }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textdata}>
        <View style={styles.name}>
          <Text style={styles.nametext}>{props.data.name}</Text>
          <View style={styles.namecircle}></View>
          <Text style={styles.nametext2}>
            {timeAgo.format(props.data.time.toDate(), "mini-minute-now") !==
            "now"
              ? timeAgo.format(props.data.time.toDate(), "mini-minute-now") +
                " ago"
              : timeAgo.format(props.data.time.toDate(), "mini-minute-now")}
          </Text>
        </View>
        <View style={styles.name2}>
          <Text style={styles.name2text}>Comment on your post</Text>
        </View>
      </View>
      {props.data.postImage.length >= 1 && (
        <View style={styles.img2}>
          <Image
            source={{ uri: props.data.postImage[0] }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  middata: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: wp("90%"),
    height: hp("9%"),
    borderRadius: wp("5%"),
    //justifyContent: 'center',
    alignItems: "center",
    marginTop: wp("2%"),
  },
  img1: {
    //backgroundColor: "red",
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: 100,
    marginLeft: wp("1%"),
    marginRight: wp("1%"),
    overflow: "hidden",
    borderColor: "#58BFE6",
    borderWidth: 1,
  },
  img2: {
    //backgroundColor: "red",
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("2%"),
    marginLeft: wp("1%"),
    marginRight: wp("1%"),
    overflow: "hidden",
    borderColor: "#58BFE6",
    borderWidth: 1,
  },
  textdata: {
    //backgroundColor: 'blue',
    width: wp("61%"),
    height: wp("12%"),
    //alignItems: 'center',
  },
  name: {
    //backgroundColor: 'yellow',
    width: wp("61%"),
    height: wp("7%"),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: wp("1%"),
  },
  nametext: {
    //fontSize: 14,
    fontSize: rfp(2),
    fontFamily: "B",
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
  name2: {
    //backgroundColor: 'pink',
    width: wp("61%"),
    height: wp("5%"),
    justifyContent: "flex-start",
    //alignItems: 'center',
    marginLeft: wp("1%"),
  },
  name2text: {
    color: "#9797BD",
    //fontSize: 13,
    fontFamily: "R",
    fontSize: rfp(1.7),
  },
});
