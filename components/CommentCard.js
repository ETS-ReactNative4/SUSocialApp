import React from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
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
import * as firebase from "firebase";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

export default function CommentCard(props) {  
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo("en-US");
  const user = firebase.auth().currentUser;
  return (
    <View style={styles.comment}>
      <TouchableOpacity
        style={styles.commentpic}
        onPress={() => (
          <>
            {props.data.authorUid == user.uid
              ? props.navigation.navigate("Profile", { uid: props.data })
              : props.navigation.navigate("UserProfile", {
                  uid: props.data.authorUid,
                })}
          </>
        )}
      >
        <Image
          //source={require("../assets/user.png")}
          source={{ uri: props.data.profile }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View style={styles.commenttext}>
          <Text
            style={{
              fontFamily: "B",
              marginBottom: hp("1%"),
              fontSize: rfp(2),
            }}
          >
            {props.data.name}
          </Text>
          <Text
            style={{
              fontFamily: "R",
              marginBottom: hp("1%"),
              fontSize: rfp(2),
            }}
          >
            {props.data.commentText}
          </Text>
        </View>
        <View style={styles.commenttime}>
          <Text style={{ fontFamily: "L", fontSize: rfp(1.4) }}>{timeAgo.format(props.data.time.toDate(), 'mini')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    width: wp("90%"),
    //height: hp("10%"),
    //backgroundColor: '#EFF3F5',
    //backgroundColor: "red",
    alignItems: "flex-start",
    //justifyContent: 'space-between',
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#C8C7CC",
    marginVertical: hp("1%"),
  },
  commentpic: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("100%"),
    //backgroundColor: "red",
    overflow: "hidden",
    borderColor: "#58BFE6",
    borderWidth: 1,
  },
  commenttext: {
    //backgroundColor: "green",
    //right: wp('12%'),
    //alignItems: 'center',
    //justifyContent: 'center',
    //height: hp("10%"),
    width: wp("62%"),
    //justifyContent: "space-evenly",
    //Marginleft: wp('2%'),
    marginLeft: wp("2%"),
  },
  commenttime: {
    alignItems: "center",
    justifyContent: "center",
    //color: '#9797BD',
    //backgroundColor: "yellow",
    //height: hp("10%"),
    width: wp("12%"),
    //left: wp('2%'),
    marginLeft: wp("2%"),
  },
});
