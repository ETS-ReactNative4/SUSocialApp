//import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
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
import * as firebase from "firebase";

export default function ChatR(props) {
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (props.data.reciever == user.uid && props.data.rRead == false) {
      db.collection("messages")
        .doc(props.id)
        .update({ rRead: true, counter: 0 });
      //setrRead(true);
    } else {
      //setrRead(false);
    }
    //db.collection("messages")
    //  .doc(props.id)
    //.where("convoId", "in", [
    //  user.uid + props.route.params.id,
    //  props.route.params.id + user.uid,
    //])
    //.orderBy("createdAt", "desc")
    //.limit(1)
    //  .get()
    //  .then((data) => {});
  }, []);

  return (
    <View style={styles.crow}>
      <View style={styles.cpic}>
        <View style={styles.pic}>
          <Image
            source={{ uri: props.profile }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.ctext}>
        <View style={styles.msg}>
          <Text style={{ fontFamily: "R", color: "#fff", fontSize: rfp(2) }}>
            {props.data.msg}
          </Text>
        </View>
        <View style={styles.ctime}>
          <Text style={{ fontFamily: "L", fontSize: rfp(1.4) }}>
            {props.data.time}
          </Text>
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
    //justifyContent: 'center',
    //alignItems: 'center',
    marginVertical: hp("1%"),
  },
  cpic: {
    width: wp("10%"),
    //height: hp("10%"),
    //backgroundColor: "green",
    //flexDirection: 'row',
    //justifyContent: 'center',
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
  ctext: {
    //width: wp("60%"),
    maxWidth: wp("75%"),
    //height: hp("10%"),
    //backgroundColor: "orange",
    flexDirection: "row",
    //justifyContent: 'center',
    //alignItems: 'center',
    paddingHorizontal: wp("1%"),
    //paddingVertical: wp('1%'),
  },
  msg: {
    maxWidth: wp("60%"),
    //width: wp("65%"),
    //height: hp("4%"),
    //backgroundColor: 'yellow',
    backgroundColor: "#4C525C",
    //flexDirection: 'row',
    //justifyContent: 'center',
    paddingHorizontal: wp("1%"),
    paddingVertical: wp("1%"),
    //alignItems: 'center',
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "#fff",
  },
  ctime: {
    width: wp("15%"),
    //height: hp("3%"),
    //backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  ctext2: {
    width: wp("80%"),
    height: hp("10%"),
    //backgroundColor: 'orange',
    //flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: "flex-end",
    paddingHorizontal: wp("1%"),
    //paddingVertical: wp('1%'),
  },
  msg2: {
    width: wp("22%"),
    height: hp("4%"),
    //backgroundColor: 'yellow',
    backgroundColor: "#58BFE6",
    //flexDirection: 'row',
    //justifyContent: 'center',
    paddingHorizontal: wp("1%"),
    paddingVertical: wp("1%"),
    //alignItems: 'center',
    borderRadius: wp("2%"),
  },
});
