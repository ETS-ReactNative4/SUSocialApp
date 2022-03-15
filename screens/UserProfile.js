import React, { useState, useEffect } from "react";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
import TopMenu from "../components/TopMenu";
import ProfilePostCard from "../components/ProfilePostCard";
import NewsFeedCard from "../components/NewsFeedCard";
import * as firebase from "firebase";
export default function UserProfile({ navigation, route }) {
  const [userInfo = "", setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  var db = firebase.firestore();

  var id = route.params.uid;
  //console.log(route.params.uid);
  //console.log(id);
  const [refreshing, setRefreshing] = useState(false);

  var docRef = db.collection("users").doc(id);

  const onRefresh = () => {
    setRefreshing(true);
    docRef
      .get()
      .then((userData) => {
        setUserInfo(userData.data());
        setRefreshing(false);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

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
      db.collection("posts")
        .where("postType", "==", "public")
        .where("authorUid", "==", id)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
          });
          setPosts(data);
          setLoading(false);
          //console.log(posts[0].data);
        });
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoading(false);
      alert(error.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TopMenu navigation={navigation} />

      <View style={styles.midw}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.mid}>
            <View style={styles.profileback}>
              <TouchableOpacity
                style={styles.profile}
                onPress={() =>
                  navigation.navigate("ImageView", { uri: userInfo.profile })
                }
              >
                <Image
                  //source={require("../assets/profile.jpg")}
                  source={{ uri: userInfo.profile }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileinfo}>
            <View style={styles.profiletext}>
              <Text style={styles.profilename}>{userInfo.name}</Text>
            </View>
            <View style={styles.profiletext}>
              <Text style={{ fontFamily: "R", fontSize: rfp(2) }}>
                {userInfo.occupation}
              </Text>
            </View>
            <View style={styles.profiletext}>
              <Text style={{ fontFamily: "R", fontSize: rfp(2) }}>
                {userInfo.bio}
              </Text>
            </View>
          </View>

          <View style={styles.editprofile}>
            <TouchableOpacity
              style={styles.editprofilecircle}
              onPress={() =>
                navigation.navigate("Chat", {
                  id: id,
                  sName: "",
                  rName: userInfo.name,
                  name: userInfo.name,
                  profile: userInfo.profile,
                })
              }
            >
              <Text
                style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.p1}>
            <View style={styles.p2}>
              <View style={styles.p3}>
                <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>Posts</Text>
                <View style={styles.p3line}></View>
              </View>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            posts.map((item, index) => {
              return (
                <ProfilePostCard
                  data={item.data}
                  id={item.id}
                  key={index}
                  navigation={navigation}
                  uid={id}
                  udata={userInfo}
                />
              );
            })
          )}

          {/* <ProfilePostCard navigation={navigation} uid={id} />
          <ProfilePostCard navigation={navigation} uid={id} /> */}
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

  midw: {
    //height: hp("80%") - StatusBar.currentHeight,
    marginBottom: hp("10%"),
    flex: 1,
  },
  mid: {
    width: wp("100%"),
    height: hp("25%"),
    //backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
  },
  profileback: {
    width: wp("40%"),
    height: wp("40%"),
    borderRadius: wp("100%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: wp("39%"),
    height: wp("39%"),
    borderRadius: wp("100%"),
    //backgroundColor: "red",
    overflow: "hidden",
  },

  profileinfo: {
    width: wp("100%"),
    height: hp("12%"),
    //backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profiletext: {
    width: wp("100%"),
    height: hp("3%"),
    //backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  profilename: {
    //fontSize: 20,
    fontSize: rfp(3),
    fontFamily: "B",
  },

  editprofile: {
    width: wp("100%"),
    height: hp("8%"),
    //flexDirection: "row",
    //backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
  },
  editprofilecircle: {
    width: wp("30%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },

  p1: {
    width: wp("100%"),
    height: hp("6%"),
    //backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "center",
  },
  p2: {
    width: wp("90%"),
    height: hp("6%"),
    //backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
    //flexDirection: 'row',
  },
  p3: {
    width: wp("90%"),
    height: hp("6%"),
    //backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: "flex-end",
    borderBottomWidth: 0.5,
  },
  p3line: {
    width: wp("15%"),
    height: wp("1%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    //alignItems: 'center',
    //justifyContent: 'center',
    //borderBottomWidth: 1,
  },
});
