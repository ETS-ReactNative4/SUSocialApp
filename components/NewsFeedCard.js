import React, { useEffect, useState } from "react";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ScrollView,
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
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function NewsFeedCard(props) {
  const user = firebase.auth().currentUser;
  var db = firebase.firestore();

  const dPost = () => {
    try {
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
    } catch (e) {
      alert("Something went wrong");
    }
  };

  return (
    <View style={styles.mid}>
      <View style={styles.middata}>
        <View style={styles.profile}>
          <Image
            //source={require("../assets/user.png")}
            source={{ uri: props.data.profile }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textdata}>
          <TouchableOpacity
            style={styles.name1}
            onPress={() => (
              <>
                {props.data.authorUid == user.uid
                  ? props.navigation.navigate("Profile", {
                      uid: props.data.authorUid,
                    })
                  : props.navigation.navigate("UserProfile", {
                      uid: props.data.authorUid,
                    })}
              </>
            )}
          >
            <Text style={styles.name1text}>{props.data.authorName}</Text>
          </TouchableOpacity>
          <View style={styles.name2}>
            <Text style={styles.name2text}>{props.data.authorOccupation}</Text>
          </View>
        </View>
        {user.uid == props.data.authorUid && (
          <Menu>
            <MenuTrigger>
              <View style={styles.midicon}>
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
                      {
                        text: "YES",
                        onPress: () => onDelete(),
                        onPress: () => dPost(),
                      },
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
      {props.data.postText !== "" && (
        <View style={styles.middata2}>
          <View style={styles.middata2text}>
            <Text style={{ fontFamily: "M", fontSize: rfp(2) }}>
              {props.data.postText}
            </Text>
          </View>
        </View>
      )}

      {props.data.images.length >= 1 && (
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
                    key={index}
                    style={styles.middata3pic}
                    onPress={() =>
                      props.navigation.navigate("ImageView", { uri: item })
                    }
                  >
                    <Image
                      source={{ uri: item }}
                      style={{ width: "100%", height: "100%" }}
                      //resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
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

      <View style={styles.middata4}>
        <View style={styles.middata4back}>
          <TouchableOpacity
            style={styles.middata4touch}
            onPress={() =>
              props.navigation.navigate("Comment", {
                cdata: props.data,
                cid: props.id,
              })
            }
          >
            <View style={styles.middata4pic}>
              <FontAwesome name="commenting" size={wp("5%")} color="#58BFE6" />
            </View>
            <Text style={styles.middata4pictext}>{props.data.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mid: {
    width: wp("100%"),
    // /minHeight: hp("50%"),
    //backgroundColor: '#EFF3F5',
    //backgroundColor: 'red',
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  middata: {
    //backgroundColor: '#fff',
    flexDirection: "row",
    width: wp("90%"),
    height: hp("10%"),
    //borderRadius: wp('5%'),
    //justifyContent: 'center',
    alignItems: "center",
    //marginTop: wp('1%'),
    //borderBottomWidth: 0.5,
    //borderBottomColor: '#4C525C',
  },

  profile: {
    //backgroundColor: "red",
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("100%"),
    overflow: "hidden",
    borderColor: "#58BFE6",
    borderWidth: 1,
    //marginLeft: wp('1%'),
    //marginRight: wp('1%'),
  },

  textdata: {
    //backgroundColor: 'blue',
    width: wp("72%"),
    height: wp("15%"),
    alignItems: "center",
    justifyContent: "center",
  },
  name1: {
    //backgroundColor: 'yellow',
    width: wp("68%"),
    height: wp("7%"),
    //flexDirection: 'row',
    justifyContent: "center",
    //alignItems: 'center',
    //marginLeft: wp('1%'),
  },
  name1text: {
    //color: 'black',
    //fontSize: 16,
    fontSize: rfp(2.2),
    fontFamily: "B",
  },
  name2: {
    //backgroundColor: 'pink',
    width: wp("68%"),
    height: wp("7%"),
    //flexDirection: 'row',
    justifyContent: "center",
    //alignItems: 'center',
    //marginLeft: wp('1%'),
  },

  name2text: {
    //color: 'black',
    //color: "#9797BD",
    //fontSize: 13,
    fontSize: rfp(1.7),
    fontFamily: "L",
  },
  midicon: {
    backgroundColor: "#58BFE6",
    width: wp("6%"),
    height: hp("5%"),
    borderRadius: wp("2%"),
    //marginLeft: wp('1%'),
    //marginRight: wp('1%'),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  middata2: {
    //backgroundColor: 'pink',
    width: wp("90%"),
    alignItems: "center",
    //height: hp('5%'),
  },
  middata2text: {
    //backgroundColor: 'yellow',
    width: wp("86%"),
    justifyContent: "center",
    //height: hp('5%'),
  },

  middata3: {
    //backgroundColor: 'green',
    width: wp("90%"),
    height: hp("45%"),
    justifyContent: "center",
    alignItems: "center",
  },
  middata3picback: {
    backgroundColor: "#fff",
    width: wp("87%"),
    height: hp("45%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  middata3pic: {
    //backgroundColor: "red",
    width: wp("86%"),
    height: hp("44%"),
    borderRadius: wp("2%"),
    overflow: "hidden",
  },

  middata4: {
    //backgroundColor: 'yellow',
    width: wp("90%"),
    height: hp("5%"),
    alignItems: "center",
  },
  middata4back: {
    //backgroundColor: 'pink',
    //flexDirection: 'row',
    width: wp("86%"),
    height: hp("5%"),
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  middata4touch: {
    flexDirection: "row",
    width: wp("15%"),
    height: hp("5%"),
    //backgroundColor: 'yellow',
    alignItems: "center",
  },
  middata4pic: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
    width: wp("8%"),
    height: wp("8%"),
    //borderRadius: wp("100%"),
    //marginLeft: wp("1%"),
  },
  middata4pictext: {
    //marginLeft: wp("1%"),
    fontFamily: "B",
    //fontSize: 10,
    fontSize: rfp(1.4),
  },
  docdata: {
    //backgroundColor: 'green',
    width: wp("86%"),
    //height: hp("6%"),
    //height: hp("45%"),
    //justifyContent: "center",
    //alignItems: "center",
  },
  docdata2: {
    borderWidth: 1,
    borderColor: "#58BFE6",
    borderRadius: wp("1%"),
    width: wp("86%"),
    height: hp("4%"),
    justifyContent: "center",
    marginTop: hp("1%"),
  },
});
