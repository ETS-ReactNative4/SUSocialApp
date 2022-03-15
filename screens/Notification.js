import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as firebase from "firebase";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import BottomMenu from "../components/BottomMenu";
import NotificationCard from "../components/NotificationCard";

export default function Notification({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [notis, setNotis] = useState([]);
  const [pos, setPos] = useState([]);
  const [posId, setPosId] = useState();
  //var cdata = [];
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    try {
      db.collection("posts")
        .where("authorUid", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          var data = [];
          var data2 = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
            data2.push(doc.id);
          });
          setPos(data);
          setPosId(data2);

          if (data2.length >= 1) {
            func(data2);
            //console.log(data3);
          } else {
            setLoading(false);
          }
          //console.log(posId[0]);
          //setLoading(false);
        });
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoading(false);
      alert(error.message);
    }
  }, []);
  // const sData = (rdata, rdata2) => {
  //   cdata?.push({ id: rdata, data: rdata2 });
  //   //console.log(cdata);
  // };
  const func = (postIdArr) => {
    try {
      let data = [];
      postIdArr.map((item) => {
        data.push(
          new Promise((response) => {
            db.collection("comments")
              .where("postId", "==", item)
              .where("authorUid", "!=", user.uid)
              .get()
              .then((results) =>
                response(results.docs.map((result) => ({ ...result.data() })))
              );
          })
        );
      });
      Promise.all(data).then((content) => {
        //console.log(content.flat());
        //res(content.flat());
        var data3 = content.flat();
        data3.sort((a, b) => b.time - a.time);
        //console.log(sortedActivities);

        const tmp = new Map();
        const rs = data3.reduce((acc, e) => {
          if (tmp.has(e.postId)) {
            if (!tmp.get(e.postId).includes(e.authorUid)) {
              acc.push(e);
              tmp.set(e.postId, [...tmp.get(e.postId), e.authorUid]);
            }
          } else {
            acc.push(e);
            tmp.set(e.postId, [e.authorUid]);
          }
          return acc;
        }, []);
        setNotis(rs);
        setLoading(false);
      });
    } catch (e) {
      alert(error.message);
      setLoading(false);
    }

    // for (let i = 0; i < postIdArr.length; i += 10) {
    //   db.collection("comments")
    //     .where("postId", "in", postIdArr.slice(i, i + 10))
    //     .where("authorUid", "!=", user.uid)
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach(async(doc) => {
    //         //sData(doc.id, doc.data());
    //           cdata.push({ id: doc.id, data: doc.data() });
    //       });
    //     });
    // }

    // cdata = await Promise.all(cdata);
  };

  //console.log(posId);

  // const func = (postIdArr) => {
  //   setLoading(true);
  //   try {
  //     db.collection("comments")
  //       .where("postId", "in", postIdArr)
  //       .where("authorUid", "!=", user.uid)
  //       //.orderBy("time", "desc")
  //       // .orderBy("authorUid")
  //       .onSnapshot((querySnapshot) => {
  //         var data3 = [];
  //         // var data2 = [];
  //         querySnapshot.forEach((doc) => {
  //           // data2.push({
  //           //   userId: doc.data().authorUid,
  //           //   pId: doc.data().postId,
  //           // });

  //           data3.push({ id: doc.id, data: doc.data() });

  //           //console.log(data2[0].data.authorUid);
  //           //console.log(doc.data().postId);
  //           //console.log(data2[0]);
  //         });
  // data3.sort((a, b) => b.data.time - a.data.time);
  // //console.log(sortedActivities);

  // const tmp = new Map();
  // const rs = data3.reduce((acc, e) => {
  //   if (tmp.has(e.data.postId)) {
  //     if (!tmp.get(e.data.postId).includes(e.data.authorUid)) {
  //       acc.push(e);
  //       tmp.set(e.data.postId, [
  //         ...tmp.get(e.data.postId),
  //         e.data.authorUid,
  //       ]);
  //     }
  //   } else {
  //     acc.push(e);
  //     tmp.set(e.data.postId, [e.data.authorUid]);
  //   }
  //   return acc;
  // }, []);
  // setNotis(rs);
  // setLoading(false);
  //       });
  //   } catch (error) {
  //     console.log("Error getting documents: ", error);
  //     setLoading(false);
  //     alert(error.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.headerw}>
        <View style={styles.header}>
          <Text style={styles.noti}>Notifications</Text>
        </View>
      </View>

      <View style={styles.midw}>
        <ScrollView style={styles.mid}>
          <View style={{ marginVertical: hp("2%"), alignItems: "center" }}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                {notis.length >= 1
                  ? notis.map((item, index) => {
                      return (
                        <NotificationCard
                          //data={item.data}
                          data={item}
                          key={index}
                          navigation={navigation}
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
    width: wp("100%"),
    //height: hp("80%") - StatusBar.currentHeight,
    marginBottom: hp("10%"),
    flex: 1,
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
