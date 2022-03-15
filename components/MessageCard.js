import React, { useState, useEffect } from "react";
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
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import * as firebase from "firebase";
import BottomMenu from "./BottomMenu";
import UserListCard from "./UserListCard";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

export default function MessageCard(props) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  //console.log(props.data.msg);

  const [unReads = 0, setUnReads] = useState();
  const [uData, setuData] = useState();
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    // try {
    //   db.collection("users")
    //     .doc(props.rId)
    //     .get()
    //     .then((doc) => {
    //       setuData(doc.data());
    //     });
    // } catch (e) {
    //   alert(e.mesesage);
    // }

    // try {
    //   db.collection("users")
    //     .doc(props.rId)
    //     .onSnapshot((doc) => {
    //       setuData(doc.data());
    //     });
    // } catch (e) {
    //   alert(e.mesesage);
    // }
  }, []);
  //console.log(uData);
  // useEffect(() => {
  //   try {
  //     db.collection("messages")
  //       .where("convoId", "in", [
  //         user.uid + props.rId,
  //         props.rId + user.uid,
  //       ])
  //       .get()
  //       .then((querySnapshot) => {
  //         var data = 0;
  //         querySnapshot.forEach((doc) => {
  //           if (doc.data().rRead == false) {
  //             data++;
  //           }
  //         });
  //         setUnReads(data);
  //       });
  //   } catch (error) {
  //     console.log("Error getting documents: ", error);
  //     alert(error.message);
  //   }
  // }, []);

  return (
    <View
      style={[
        styles.middata,
        { backgroundColor: props.read ? "rgba(88, 191, 230, 0.1)" : "#fff" },
      ]}
    >
      <TouchableOpacity
        style={styles.img1}
        onPress={() =>
          props.navigation.navigate("UserProfile", { uid: props.rId })
        }
      >
        <Image
          source={{ uri: props.profile }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textdata}
        onPress={() =>
          props.navigation.navigate("Chat", {
            id: props.rId,
            sName: props.data.sName,
            //rName: props.data.rName,
            rName: props.name,
            name: props.name,
            read: props.read,
            //profile: uData?.profile,
            profile: props.profile,
            //name: uData?.name,
            //auser: props.auser
            //online:props.online,
            //sid: props.sId,
            //data: props.data
          })
        }
      >
        <View style={styles.name}>
          <Text style={styles.nametext}>{props.name}</Text>
          {/* <View style={styles.namecircle}></View>
                <Text style={styles.nametext2}>4m ago</Text> */}
        </View>
        <View style={styles.name2}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.name2text2,
              {
                color: props.read ? "#9797BD" : "black",
                maxWidth: props.read ? wp("60%") : wp("54%"),
              },
            ]}
          >
            {props.data.msg.replace(/\s+/g, " ").trim()}
          </Text>
          <View style={styles.namecircle}></View>
          <Text style={styles.nametext2}>
            {timeAgo.format(
              props.data.createdAt.toDate(),
              "mini-minute-now"
            ) !== "now"
              ? timeAgo.format(
                  props.data.createdAt.toDate(),
                  "mini-minute-now"
                ) + " ago"
              : timeAgo.format(
                  props.data.createdAt.toDate(),
                  "mini-minute-now"
                )}
          </Text>
        </View>
      </TouchableOpacity>
      {props.read == false && (
        <View style={styles.img2}>
          <Text style={styles.img2text}>{props.data.counter}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  middata: {
    backgroundColor: "#fff",
    //backgroundColor: 'rgba(76, 82, 92, 0.5)',
    flexDirection: "row",
    width: wp("100%"),
    height: hp("9%"),
    borderRadius: wp("5%"),
    //justifyContent: "space-around",
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
    marginLeft: wp("2%"),
    //marginRight: wp('1%'),
  },
  img2: {
    backgroundColor: "#58BFE6",
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("2%"),
    marginLeft: wp("2%"),
    //marginRight: wp('1%'),
    alignItems: "center",
    justifyContent: "center",
    //borderColor: "black",
    //borderWidth: 1,
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
  img2text: {
    color: "white",
    fontFamily: "R",
    fontSize: rfp(2),
  },
  textdata: {
    //backgroundColor: 'blue',
    width: wp("74%"),
    height: wp("12%"),
    //alignItems: 'center',
    marginLeft: wp("2%"),
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
    //color: '#58BFE6',
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
    //backgroundColor: 'black',
    width: wp("1.5%"),
    height: wp("1.5%"),
    borderRadius: wp("100%"),
    marginLeft: wp("2%"),
  },
  nametext2: {
    //fontSize: 11,
    fontSize: rfp(1.5),
    color: "#9797BD",
    //color: 'black',
    marginLeft: wp("2%"),
    fontFamily: "R",
  },
  name2text: {
    color: "#9797BD",
    //color: 'white',
    fontSize: 13,
    //fontFamily: 'R',
  },
  name2text2: {
    color: "black",
    //backgroundColor: "yellow",
    maxWidth: wp("54%"),
    //fontSize: 13,
    //fontSize: wp('3.2%'),
    fontSize: rfp(1.7),
    fontFamily: "R",
  },
});
