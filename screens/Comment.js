import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
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
import CommentCard from "../components/CommentCard";

export default function Comment({ navigation, route }) {
  //console.log(route.params.cdata);
  const [userInfo = "", setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comText = "", setComText] = useState();
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  //console.log(route.params.cid);

  var docRef = db.collection("users").doc(user.uid);

  useEffect(() => {
    docRef
      .get()
      .then((userData) => {
        setUserInfo(userData.data());
        //console.log(userData.data())
        //console.log(userInfo.name);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  useEffect(() => {
    try {
      db.collection("comments")
        .where("postId", "==", route.params.cid)
        .orderBy("time","desc")
        .onSnapshot((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
          });
          setComments(data);
          updCom(data.length);
          setLoading(false);
        });
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoading(false);
      alert(error.message);
    }
  }, []);
  //console.log(comments.length);
  //console.log(comments[0]);

  const updCom = (coms) => {
    db.collection("posts")
      .doc(route.params.cid)
      .update({
        comments: coms,
      })
      .then(() => {
        //console.log("Document successfully updated!");
        //console.log(comments.length);
      });
  };

  const onComment = () => {
    if (comText.trim() !== "") {
      db.collection("comments")
        .add({
          authorUid: user.uid,
          comId: 0,
          commentText: comText.trim(),
          name: userInfo.name,
          postId: route.params.cid,
          postImage: route.params.cdata.images, 
          profilepic: "null",
          time: new Date(),
          profile: userInfo.profile,
        })
        .then((docRef) => {
          //setLoading(false);
          //alert("Congrats! account has been created");
        })
        .catch((error) => {
          alert("Something went wrong!");
          //setLoading(false);
        });
    } else {
      alert("Write a comment...");
    }
    //textInputRef.clear();
    setComText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerw}>
        <View style={styles.header}>
          <View style={styles.arrow}>
            <TouchableOpacity
              style={styles.arrowcircle}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="back" size={wp("6%")} color="#4C525C" />
            </TouchableOpacity>
          </View>
          <View style={styles.com}>
            <Text style={styles.htext}>Comments</Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.midw}>
        <View style={styles.mid}>
          <View style={styles.midstatus}>
            <Text style={{ fontFamily: "R" }}>
              mandypo its been a very wonderful time on the west beach today.
              Best day ever, Thanks! @maryjane #summertime #beachlife
            </Text>
          </View>
        </View>
      </View> */}

      <View style={styles.commentw}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={comments}
            renderItem={(item, index) => {
              return (
                <CommentCard
                  data={item.item.data}
                  id={item.item.id}
                  key={index}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
        {/* <ScrollView>
          <CommentCard navigation={navigation} />
        </ScrollView> */}
      </View>

      <View style={styles.bottomw}>
        <View style={styles.bottom}>
          <View style={styles.bottomtext}>
            <TextInput
              // ref={(input) => {
              //   textInputRef = input;
              // }}
              value={comText}
              placeholder="Write a comment..."
              multiline={true}
              style={{
                minHeight: hp("6%"),
                maxHeight: hp("10%"),
                fontFamily: "R",
                fontSize: rfp(2),
              }}
              onChangeText={(val) => setComText(val)}
            />
          </View>
          <TouchableOpacity
            style={styles.bottomcircle}
            onPress={() => onComment()}
          >
            <FontAwesome name="send" size={wp("6%")} color="#4C525C" />
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
    backgroundColor: "#4C525C",
  },
  headerw: {
    //height: hp("15%"),
    height: StatusBar.currentHeight + hp("10%"),
    //paddingTop: StatusBar.currentHeight,
    //backgroundColor: '#4C525C',
    backgroundColor: "#EFF3F5",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: wp("90%"),
    height: hp("10%"),
    //height: StatusBar.currentHeight + hp("10%"),
    //backgroundColor: 'red',
    //backgroundColor: '#EFF3F5',
    //alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: "row",
    //borderWidth: 1,
  },
  htext: {
    //fontSize: 20,
    fontSize: rfp(3),
    fontFamily: "M",
  },
  arrow: {
    width: wp("31%"),
    //width: wp('0%'),
    height: hp("10%"),
    //backgroundColor: 'red',
    alignItems: "flex-start",
    justifyContent: "center",
  },
  arrowcircle: {
    width: wp("10%"),
    //width: wp('0%'),
    height: wp("10%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  com: {
    width: wp("59%"),
    //width: wp('90%'),
    height: hp("10%"),
    //backgroundColor: 'pink',
    alignItems: "flex-start",
    //alignItems: 'center',
    justifyContent: "center",
  },
  // midw: {
  //   backgroundColor: "#EFF3F5",
  //   //backgroundColor: 'red',
  //   height: hp("10%"),
  //   alignItems: "center",
  //   //borderWidth: 1,
  // },
  // mid: {
  //   width: wp("90%"),
  //   height: hp("10%"),
  //   //backgroundColor: '#EFF3F5',
  //   //alignItems: 'center',
  //   //justifyContent: 'center',
  //   //flexDirection: 'row',
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#C8C7CC",
  // },
  // midstatus: {
  //   width: wp("90%"),
  //   height: hp("10%"),
  //   //backgroundColor: 'red'
  // },
  commentw: {
    marginBottom: hp("15%"),
    flex: 1,
    //paddingVertical: hp("2%"),
    backgroundColor: "#EFF3F5",
    //backgroundColor: 'red',
    //height: hp("62%"),
    alignItems: "center",
    //borderWidth: 1,
    //borderBottomStartRadius: wp('10%'),
    //borderBottomEndRadius: wp('10%'),
    borderBottomLeftRadius: wp("13%"),
    borderBottomRightRadius: wp("13%"),
    //marginBottom: hp('5%'),
    overflow: "hidden",
  },

  bottomw: {
    //flex: 1,
    width: wp("100%"),
    height: hp("15%"),
    position: "absolute",
    bottom: 0,
    //width: wp("90%"),
    //justifyContent: 'center',
    alignItems: "center",
    //backgroundColor: '#4C525C',
    //backgroundColor: 'red',
    //position:'absolute',
    //bottom:0,
  },
  bottom: {
    //backgroundColor: 'red',
    width: wp("90%"),
    height: hp("15%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomtext: {
    backgroundColor: "#EFF3F5",
    width: wp("75%"),
    minHeight: hp("6%"),
    maxHeight: hp("10%"),
    //height: hp("10%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    //alignItems: 'center',
    paddingHorizontal: wp("2%"),
    borderColor: "#fff",
    borderWidth: 1,
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
  btext2: {
    //marginLeft: wp('5%'),
  },
});
