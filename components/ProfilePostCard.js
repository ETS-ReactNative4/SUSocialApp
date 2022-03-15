import React from "react";
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
  Alert,
  Linking,
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
import BottomMenu from "../components/BottomMenu";
import TopMenu from "../components/TopMenu";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function ProfilePostCard(props) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const user = firebase.auth().currentUser;
  var db = firebase.firestore();

  const onDelete = () => {
    try {
      db.collection("comments")
        .where("postId", "==", props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .catch((error) => {});

      db.collection("posts")
        .doc(props.id)
        .delete()
        .then(() => {
          //console.log("Document successfully deleted!");
        })
        .catch((error) => {
          //console.error("Error removing document: ", error);
        });
    } catch {
      alert("Something went wrong");
    }
  };

  //console.log(uid);
  //console.log(data[0].data.authorName);
  //console.log(data.author);
  //console.log(props.udata.name);

  return (
    <View style={styles.wrap}>
      <View style={styles.a1}>
        <View style={styles.a2}>
          <View style={styles.a3}>
            <Image
              //source={require("../assets/profile.jpg")}
              source={{ uri: props.udata.profile }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.a4}>
            <Text style={{ fontFamily: "M", fontSize: rfp(2) }}>
              {props.data.authorName}
            </Text>
            <Text style={{ fontFamily: "L", fontSize: rfp(1.4) }}>
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
          {user.uid == props.uid && (
            // <TouchableOpacity style={styles.a5}>
            //   <SimpleLineIcons
            //     name="options-vertical"
            //     size={wp("4%")}
            //     color="white"
            //   />
            // </TouchableOpacity>
            <Menu>
              <MenuTrigger>
                <View style={styles.a5}>
                  <SimpleLineIcons
                    name="options-vertical"
                    size={wp("4%")}
                    color="white"
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  marginLeft: -wp("4%"),
                  marginTop: hp("4%"),
                  width: wp("20%"),
                  height: wp("10%"),
                  borderRadius: wp("5%"),
                  backgroundColor: "#d11a2a",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <MenuOption
                  onSelect={() =>
                    Alert.alert(
                      "Confirmation",
                      "Are you sure you want to delete this post?",
                      [
                        {
                          text: "NO",
                        },
                        { text: "YES", onPress: () => onDelete() },
                      ]
                    )
                  }
                >
                  <Text
                    style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}
                  >
                    Delete
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}
        </View>
      </View>
      {props.data.postText !== "" && (
        <View style={styles.b1}>
          <View style={styles.b2}>
            <Text style={{ fontFamily: "R", fontSize: rfp(2) }}>
              {props.data.postText}
            </Text>
          </View>
        </View>
      )}

      {props.data.images.length >= 1 && (
        <View style={styles.midw}>
          <View style={styles.middata3}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {props.data.images.map((item, index) => {
                return (
                  <View key={index} style={styles.middata3picback}>
                    <TouchableOpacity
                      style={styles.middata3pic}
                      key={index}
                      onPress={() =>
                        props.navigation.navigate("ImageView", { uri: item })
                      }
                    >
                      <Image
                        source={{ uri: item }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
      {props.data.document.length >= 1 && (
        <View style={styles.docdata}>
          {props.data.document.map((item, index) => {
            return (
              <View key={index} style={styles.docdata2}>
                <TouchableOpacity
                  key={index}
                  onPress={() => Linking.openURL(item.url)}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ marginLeft: wp("2%"), color: "red" }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.c1}>
        <View style={styles.c2}>
          <TouchableOpacity
            style={styles.c3}
            onPress={() =>
              // props.navigation.navigate("Comment", {
              //   cdata: props.data,
              //   cid: props.id,
              // })
              props.navigation.replace("Comment", {
                cdata: props.data,
                cid: props.id,
              })
            }
          >
            <View style={styles.c4}>
              <FontAwesome name="commenting" size={wp("4%")} color="#58BFE6" />
            </View>
            <Text style={{ fontFamily: "M", fontSize: rfp(1.4) }}>
              {props.data.comments}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{ width: wp("100%"), height: hp("1%"), alignItems: "center" }}
      >
        <View
          style={{ width: wp("90%"), height: hp("1%"), borderBottomWidth: 0.5 }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    //flex: 1,
    //marginVertical: hp('1%'),
    paddingVertical: hp("1%"),
    //borderBottomWidth: 0.5,
  },
  a1: {
    width: wp("100%"),
    height: hp("8%"),
    //backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
  a2: {
    width: wp("90%"),
    height: hp("6%"),
    //backgroundColor: 'yellow',
    alignItems: "center",
    //justifyContent: "space-between",
    flexDirection: "row",
  },
  a3: {
    width: wp("8%"),
    height: wp("8%"),
    //backgroundColor: "red",
    borderRadius: wp("100%"),
    overflow: "hidden",
    borderColor: "#58BFE6",
    borderWidth: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  a4: {
    width: wp("73%"),
    height: hp("5%"),
    //backgroundColor: 'pink',
    marginLeft: wp("1.5%"),
    //alignItems: 'center',
    justifyContent: "space-around",
  },
  a5: {
    width: wp("6%"),
    height: hp("5%"),
    borderRadius: wp("2%"),
    backgroundColor: "#58BFE6",
    //borderRadius: wp('100%'),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },

  b1: {
    width: wp("100%"),
    //height: hp("4%"),
    //backgroundColor: 'pink',
    alignItems: "center",
    //justifyContent: 'center',
  },
  b2: {
    width: wp("85%"),
    //height: hp("4%"),
    //backgroundColor: 'green',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  c1: {
    width: wp("100%"),
    height: hp("4%"),
    //backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
    //borderBottomWidth: 0.5,
  },
  c2: {
    width: wp("85%"),
    height: hp("4%"),
    //backgroundColor: 'pink',
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  c3: {
    width: wp("12%"),
    height: hp("4%"),
    //backgroundColor: 'blue',
    flexDirection: "row",
    alignItems: "center",
  },
  c4: {
    width: wp("7%"),
    height: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
    //borderRadius: wp("100%"),
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginRight: wp("1%"),
  },

  midw: {
    width: wp("100%"),
    height: hp("25%"),
    alignItems: "center",
  },
  middata3: {
    //backgroundColor: 'green',
    width: wp("88%"),
    height: hp("25%"),
    justifyContent: "center",
    alignItems: "center",
  },
  middata3picback: {
    backgroundColor: "#fff",
    width: wp("85%"),
    height: hp("25%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  middata3pic: {
    //backgroundColor: "red",
    width: wp("84%"),
    height: hp("24%"),
    borderRadius: wp("2%"),
    overflow: "hidden",
  },
  docdata: {
    //backgroundColor: 'green',
    width: wp("100%"),
    //height: hp("6%"),
    //height: hp("45%"),
    //justifyContent: "center",
    alignItems: "center",
  },
  docdata2: {
    borderWidth: 1,
    borderColor: "#58BFE6",
    borderRadius: wp("1%"),
    width: wp("84%"),
    height: hp("4%"),
    justifyContent: "center",
    marginTop: hp("1%"),
  },
});
