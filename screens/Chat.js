//import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  useFocusEffect,
  StackActions,
  useIsFocused,
} from "@react-navigation/native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  FlatList,
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
import ChatR from "../components/ChatR";
import ChatS from "../components/ChatS";

var is_Mounted = false;

export default function Chat(props) {
  const [loading, setLoading] = useState(true);
  const [msgs, setMsgs] = useState([]);
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const [msgText = "", setMsgText] = useState();
  const [myData, setMydata] = useState([]);
  const [counter = 0, setCounter] = useState();
  const [rRead = false, setrRead] = useState();
  const [isOnline, setisOnline] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    is_Mounted = true;

    //let logic = props.route.params.id==props.route.params.data.sender?props.route.params.data.reciever:props.route.params.data.sender;
    //console.log(logic);
    // if (props.route.params.online == true) {
    //   setisOnline(true);
    // } else {
    //   setisOnline(false);
    // }

    //setrRead(true);
    //console.log(isOnline);

    //setrRead(false);

    if (is_Mounted) {
      try {
        var unSub = db
          .collection("messages")
          .where("convoId", "in", [
            user.uid + props.route.params.id,
            props.route.params.id + user.uid,
          ])
          .orderBy("createdAt", "desc")
          .onSnapshot((querySnapshot) => {
            var data = [];
            var data2 = 0;
            querySnapshot.forEach((doc) => {
              data.push({ id: doc.id, data: doc.data() });

              // if (
              //   doc.data().reciever == user?.uid &&
              //   doc.data().rRead == false
              // ) {
              //   db.collection("messages")
              //     .doc(doc.id)
              //     .update({ rRead: true, counter: 0 });
              // }
              if (
                doc.data().reciever != user?.uid &&
                doc.data().rRead == false
              ) {
                data2++;
              }
            });
            setMsgs(data);
            setCounter(data2);
            //setisOnline(false);
            // if(isFocused==true){
            //   onCheckOnline();
            // }
            //onCheckOnline();
            setLoading(false);
          });
      } catch (error) {
        console.log("Error getting documents: ", error);
        setLoading(false);
        alert(error.message);
      }
    }
    return () => (is_Mounted = false);
  }, []);

  // const check = async (rid) => {
  //   var id;
  //   var logic = await db
  //     .collection("users")
  //     .doc(rid)
  //     .get()
  //     .then((d) => {
  //       id = d.id;
  //     });
  //   return id;
  // };

  // const run = (online) => {
  //   is_Mounted = true;
  //   if (is_Mounted) {
  //     try {
  //       db.collection("messages")
  //         .where("convoId", "in", [
  //           user.uid + props.route.params.id,
  //           props.route.params.id + user.uid,
  //         ])
  //         .orderBy("createdAt", "desc")
  //         .onSnapshot((querySnapshot) => {
  //           var data = [];
  //           var data2 = 0;
  //           querySnapshot.forEach((doc) => {
  //             data.push({ id: doc.id, data: doc.data() });

  //             if (
  //               doc.data().reciever == user.uid &&
  //               doc.data().rRead == false &&
  //               online == "true"
  //             ) {
  //               db.collection("messages")
  //                 .doc(doc.id)
  //                 .update({ rRead: true, counter: 0 });
  //             }
  //             if (
  //               doc.data().reciever != user.uid &&
  //               doc.data().rRead == false
  //             ) {
  //               data2++;
  //             }
  //           });
  //           setMsgs(data);
  //           setCounter(data2);
  //           setLoading(false);
  //         });
  //     } catch (error) {
  //       console.log("Error getting documents: ", error);
  //       setLoading(false);
  //       alert(error.message);
  //     }
  //   }
  //   return () => (is_Mounted = false);
  // };

  useEffect(() => {
    //console.log(userData.data())
    //console.log(userInfo.name);
    //db.collection("users")
    //.doc(user.uid)
    //.update({ isOnline: "true" })
    //.then(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((data) => {
        setMydata(data.data());
        //run(data.data().isOnline);
        //console.log(data.data());
      })
      .catch((e) => {
        alert(e.message);
      });
    //})
    //.catch((e) => {
    //alert(e.message);
    //});

    //onCheckOnline();
  }, []);

  // const onBack = () => {
  //   db.collection("users")
  //     .doc(user.uid)
  //     .update({ isOnline: "false" })
  //     .then(() => {
  //       db.collection("users")
  //         .doc(user.uid)
  //         .get()
  //         .then((data) => {
  //           setMydata(data.data());
  //           props.navigation.goBack();
  //           //console.log(data.data());
  //         })
  //         .catch((e) => {
  //           alert(e.message);
  //         });
  //     })
  //     .catch((e) => {
  //       alert(e.message);
  //     });
  // };

  // const onCheckOnline = () => {
  //   db.collection("messages")
  //     .where("convoId", "in", [
  //       user.uid + props.route.params.id,
  //       props.route.params.id + user.uid,
  //     ])
  //     .orderBy("createdAt", "desc")
  //     //.limit(1)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         if (doc.data().reciever == user.uid && doc.data().rRead == false) {
  //           db.collection("messages")
  //             .doc(doc.id)
  //             .update({ rRead: true, counter: 0 });
  //           //setrRead(true);
  //         } else {
  //           //setrRead(false);
  //         }
  //       });
  //     });
  // };

  const sendMsg = (myid) => {
    if (msgText.trim() !== "") {
      let cTime = new Date();
      let time = cTime.getHours() + ":" + cTime.getMinutes();
      db.collection("messages")
        .add({
          createdAt: new Date(),
          sender: user.uid,
          reciever: props.route.params.id,
          sName: myData?.name,
          rName: props.route.params.rName,
          users: [user.uid, props.route.params.id],
          convoId: user.uid + props.route.params.id,
          seen: false,
          msg: msgText.trim(),
          time: time,
          sRead: true,
          rRead: rRead,
          counter: counter + 1,
          sprofile: myData?.profile,
          rprofile: props.route.params.profile,
        })
        .then((docRef) => {
          setLoading(false);
          //onCheckOnline();
          //showMsg();
        })
        .catch((error) => {
          alert("Something went wrong!");
          setLoading(false);
        });
      //onCheckOnline();
    } else {
      alert("Write a message...");
    }
    //textInputRef.clear();
    setMsgText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.back}>
            <TouchableOpacity
              style={styles.backbutton}
              onPress={() => {
                props.navigation.goBack();
                //props.navigation.reset();
                //onBack();
              }}
            >
              <AntDesign name="back" size={wp("6%")} color="#4C525C" />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <View style={styles.profilepic}>
              <Image
                source={{ uri: props.route.params.profile }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            <Text style={{ fontFamily: "B", color: "black", fontSize: rfp(2) }}>
              {props.route.params.name}
            </Text>
          </View>
          <View style={styles.space}></View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <View style={styles.midw}>
            <View style={styles.mid}>
              <View style={{ marginVertical: hp("1%") }}>
                {msgs.length >= 1 ? (
                  <FlatList
                    inverted
                    data={msgs}
                    renderItem={(item, index) => {
                      return (
                        <View key={index}>
                          {/* <View style={styles.time}>
                              <Text style={{ fontFamily: "R", fontSize: rfp(1.6) }}>SEPT 12, 2021</Text>
                            </View> */}
                          {item.item.data.sender == user.uid ? (
                            <ChatS
                              data={item.item.data}
                              navigation={props.navigation}
                              profile={myData?.profile}
                            />
                          ) : (
                            <ChatR
                              data={item.item.data}
                              id={item.item.id}
                              navigation={props.navigation}
                              profile={props.route.params.profile}
                            />
                          )}
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.id}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </>
      )}

      <View style={styles.bottomw}>
        <View style={styles.bottom}>
          <View style={styles.bottomtext}>
            <TextInput
              // ref={(input) => {
              //   textInputRef = input;
              // }}
              value={msgText}
              placeholder="Type your message..."
              multiline={true}
              style={{
                minHeight: hp("6%"),
                maxHeight: hp("10%"),
                fontFamily: "R",
                fontSize: rfp(2),
              }}
              //value={msgText}
              // onChangeText={(val) => setMsgText(val.trim())}
              onChangeText={(val) => setMsgText(val)}
            />
          </View>
          <TouchableOpacity
            style={styles.bottomcircle}
            onPress={() => sendMsg()}
          >
            <Ionicons name="send" size={wp("6%")} color="#4C525C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: "#EFF3F5",
  },

  headerWrapper: {
    //height: hp("15%"),
    height: StatusBar.currentHeight + hp("14%"),
    //backgroundColor: 'red',
    justifyContent: "flex-end",
    alignItems: "center",
    //borderBottomWidth: 1,
    //backgroundColor: "#4C525C",
    //borderBottomLeftRadius: wp("10%"),
    //borderBottomRightRadius: wp("10%"),
  },
  header: {
    width: wp("90%"),
    height: hp("12%"),
    //backgroundColor: 'green',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  back: {
    width: wp("15%"),
    height: hp("11%"),
    //backgroundColor: 'yellow',
    justifyContent: "center",
  },
  backbutton: {
    width: wp("10%"),
    height: wp("10%"),
    backgroundColor: "#58BFE6",
    borderRadius: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  profile: {
    width: wp("60%"),
    height: hp("11%"),
    //backgroundColor: 'pink',
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  profilepic: {
    width: wp("14%"),
    height: wp("14%"),
    //backgroundColor: "red",
    borderRadius: wp("10%"),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#58BFE6",
  },
  space: {
    width: wp("15%"),
    height: hp("11%"),
    //backgroundColor: 'orange',
  },

  midw: {
    width: wp("100%"),
    //height: hp("75%"),
    //height: hp("74%") - StatusBar.currentHeight,
    marginBottom: hp("12%"),
    flex: 1,
    //backgroundColor: "yellow",
    //backgroundColor: '#EFF3F5',
    justifyContent: "flex-end",
    alignItems: "center",
    //borderBottomWidth: 1,
  },
  mid: {
    width: wp("90%"),
    //height: hp("74%") - StatusBar.currentHeight,
    //marginBottom:hp('10%'),
    //flex: 1,
    //backgroundColor: 'green',
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  time: {
    width: wp("90%"),
    height: hp("8%"),
    //backgroundColor: 'yellow',
    //flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },

  bottomw: {
    position: "absolute",
    bottom: 0,
    width: wp("100%"),
    height: hp("12%"),
    //minHeight: hp("10%"),
    //maxHeight: hp("20%"),
    //flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#4C525C",
    //borderTopWidth: 1,
    borderTopLeftRadius: wp("10%"),
    borderTopRightRadius: wp("10%"),
  },
  bottom: {
    //backgroundColor: 'red',
    width: wp("90%"),
    height: hp("12%"),
    //minHeight: hp("10%"),
    //maxHeight: hp("20%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomtext: {
    backgroundColor: "#EFF3F5",
    //backgroundColor: 'white',
    width: wp("75%"),
    minHeight: hp("6%"),
    maxHeight: hp("10%"),
    //minHeight: hp("8%"),
    //maxHeight: hp("18%"),
    borderRadius: wp("2%"),
    //justifyContent: "center",
    paddingHorizontal: wp("2%"),
    //paddingVertical: wp("2%"),
    borderColor: "#fff",
    borderWidth: 1,
    //alignItems: 'center',
    //overflow: 'hidden',
  },
  bottomcircle: {
    backgroundColor: "#58BFE6",
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
});
