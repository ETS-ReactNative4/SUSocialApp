import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import BottomMenu from "../components/BottomMenu";
import MessageCard from "../components/MessageCard";
import * as firebase from "firebase";

export default function Messages({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [msgs, setMsgs] = useState([]);
  //const [unReads=0, setUnReads] = useState();
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    try {
      db.collection("messages")
        .where("users", "array-contains", user.uid)
        .orderBy("createdAt", "desc")

        .onSnapshot((querySnapshot) => {
          var data = [];
          //var data2 = 0;
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
            // if(doc.data().reciever==user.uid && doc.data().rRead==false){
            //   data2++;
            // }
          });
          //console.log(data);
          //setUnReads(data2);
          setMsgs(
            data.filter(
              (v, i, a) =>
                a.findIndex(
                  (t) =>
                    t.data.convoId === v.data.sender + v.data.reciever ||
                    t.data.convoId === v.data.reciever + v.data.sender
                ) === i
            )
          );
          setLoading(false);
        });
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoading(false);
      alert(error.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerw}>
        <View style={styles.header}>
          <Text style={styles.noti}>Messages</Text>
        </View>
      </View>

      <View style={styles.midw}>
        <ScrollView style={styles.mid}>
          <View style={{ marginVertical: hp("2%") }}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                {msgs.length >= 1
                  ? msgs.map((item, index) => {
                      let name =
                        item.data.sender == user.uid
                          ? item.data.rName
                          : item.data.sName;
                      let rId =
                        item.data.sender == user.uid
                          ? item.data.reciever
                          : item.data.sender;
                      let read =
                        item.data.sender == user.uid
                          ? item.data.sRead
                          : item.data.rRead;
                      let onlinecheck =
                        item.data.sender == user.uid ? false : true;
                      let sId =
                        item.data.sender == user.uid
                          ? item.data.sender
                          : item.data.reciever;
                      let profile =
                        item.data.sender == user.uid
                          ? item.data.rprofile
                          : item.data.sprofile;
                      return (
                        <MessageCard
                          data={item.data}
                          rId={rId}
                          name={name}
                          key={index}
                          read={read}
                          profile={profile}
                          //online={onlinecheck}
                          //counter={unReads}
                          navigation={navigation}
                          //auser={user.uid}
                          //sId={sId}
                        />
                      );
                    })
                  : null}
              </>
            )}
          </View>
        </ScrollView>
      </View>

      <BottomMenu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: "#EFF3F5",
  },
  headerw: {
    height: StatusBar.currentHeight + hp("10%"),
    alignItems: "center",
    justifyContent: "center",
    //height: hp("10%"),
    //backgroundColor: '#4C525C',
  },
  header: {
    backgroundColor: "#EFF3F5",
    width: wp("100%"),
    height: hp("10%"),
    //height: hp('20%'),
    justifyContent: "center",
    alignItems: "center",
    //borderBottomLeftRadius: wp('5%'),
    //borderBottomRightRadius: wp('5%'),
  },
  noti: {
    //fontSize: 20,
    fontSize: rfp(3),
    //color: "black",
    fontFamily: "M",
  },
  midw: {
    //height: hp("80%"),
    width: wp("100%"),
    marginBottom: hp("10%"),
    flex: 1,
    //height: hp("80%") - StatusBar.currentHeight,
    //backgroundColor: 'red',
  },
  mid: {
    //paddingVertical: hp("1%"),
    width: wp("100%"),
    //height: hp("80%") - StatusBar.currentHeight,
    backgroundColor: "#EFF3F5",
    //alignItems: "center",
  },
});
