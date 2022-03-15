import React, { useState, useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

export default function Editprofile({ navigation }) {
  const [images, setImages] = useState([]);
  const [uData = "", setUData] = useState();
  const [name = "", setName] = useState();
  const [occ = "", setOcc] = useState();
  const [bio = "", setBio] = useState();
  const [pass = "", setPass] = useState();
  const [cpass = "", setcPass] = useState();
  const [currentpass = "", setCurrentPass] = useState();
  const [infoUpdate, setinfoUpdate] = useState(false);
  const [picUpdate, setpicUpdate] = useState(false);
  const [passUpdate, setpassUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);

  var db = firebase.firestore();
  const user = firebase.auth().currentUser;
  //const credential = promptForCredentials();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    var docRef = db.collection("users").doc(user.uid);

    docRef
      .get()
      .then((userData) => {
        setUData(userData.data());
        setName(userData.data().name);
        setOcc(userData.data().occupation);
        setBio(userData.data().bio);
        setCurrentPass(userData.data().pass);
        setLoading2(false);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    //console.log(uData);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      //let newArr = images.concat(result.uri);
      setImages([result.uri]);
    }
    //console.log(images[0]);
  };

  const onRemove = (id) => {
    //console.log(images);
    //console.log(id);
    var array = [...images];
    if (id !== -1) {
      array.splice(id, 1);
      setImages(array);
    }
    //console.log(images);
  };

  const onDone = () => {
    setLoading(true);
    if (name != "" && occ != "" && bio != "") {
      if (name.length >= 6) {
        if (name == uData.name && occ == uData.occupation && bio == uData.bio) {
          setinfoUpdate(false);
          //checkImage(false);
          checkPass(false);
        } else {
          setinfoUpdate(true);
          //checkImage(true);
          checkPass(true);
        }
      } else {
        alert("Name must contain atleast 6 characters");
        setLoading(false);
      }
    } else {
      alert("Fill all details");
      setLoading(false);
    }
  };

  const checkImage = (info, password) => {
    if (images.length >= 1) {
      //var recievedImages=("");
      images.map(async (item, index) => {
        var imgName = user.uid + Math.floor(Math.random() * 127212);
        const response = await fetch(item);
        const blob = await response.blob();
        var ref = firebase.storage().ref("userProfiles/" + imgName + ".jpg");
        ref
          .put(blob)
          .then((res) => {
            ref
              .getDownloadURL()
              .then((url) => {
                setpicUpdate(true);
                update(info, password, true, url);
                //recievedImages.push(url);
                //recievedImages=url;
              })
              .catch((e) => {
                //console.log(e.message);
                alert(e.message);
                setLoading(false);
              });
          })
          .catch((e) => {
            //console.log(e.message);
            alert(e.message);
            setLoading(false);
          });
      });
      //setpicUpdate(true);
      //checkPass(info, true);
      //update(info, password, true, recievedImages);
    } else {
      setpicUpdate(false);
      //checkPass(info, false);
      update(info, password, false, uData?.profile);
    }
  };

  const checkPass = (info) => {
    if (pass != "" && cpass != "") {
      if (pass.length >= 8) {
        if (pass === cpass) {
          setpassUpdate(true);
          checkImage(info, true);
          //update(info, pic, true);
        } else {
          alert("Confirm password not match");
          setLoading(false);
        }
      } else {
        alert("Password must contain atleast 8 characters");
        setLoading(false);
      }
    } else {
      setpassUpdate(false);
      checkImage(info, false);
      //update(info, pic, false);
    }
  };

  const update = (info, password, pic, url) => {
    try {
      if ((info == true || pic == true) && password == false) {
        updateInfo(url);
      } else if ((info == true || pic == true) && password == true) {
        updateInfo(url, true);
      } else if (info == false && pic == false && password == true) {
        updatePass();
      } else {
        navigation.goBack();
        setLoading(false);
      }
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  };

  const updateInfo = (url, password) => {
    try {
      db.collection("users")
        .doc(user.uid)
        .update({ name: name, occupation: occ, bio: bio, profile: url })
        .then(() => {})
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });

      db.collection("posts")
        .where("authorUid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                authorName: name,
                authorOccupation: occ,
                profile: url,
              })
              .then(() => {})
              .catch((error) => {
                alert(error.message);
                setLoading(false);
              });
          });
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });

      db.collection("comments")
        .where("authorUid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({ name: name, profile: url })
              .then(() => {})
              .catch((error) => {
                alert(error.message);
                setLoading(false);
              });
          });
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });

      db.collection("messages")
        .where("users", "array-contains", user.uid)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().sender == user.uid) {
              doc.ref.update({
                sName: name,
                sprofile: url,
              });
            } else {
              doc.ref.update({
                rName: name,
                rprofile: url,
              });
            }
          });
          if (password == true) {
            updatePass();
          } else {
            navigation.goBack();
            //navigation.navigate("Profile");
            setLoading(false);
          }
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } catch (e) {
      alert(e.message);
    }
  };
  const updatePass = () => {
    // TODO(you): prompt the user to re-provide their sign-in credentials
    //const credential = promptForCredentials();
    // const credential = EmailAuthProvider.getCredential(
    // "user@example.com",
    // "password1234"
    //);
    //var credential = firebase.auth.EmailAuthProvider.credential(user.email, pass);
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentpass
    );

    user
      .reauthenticateWithCredential(cred)
      .then(() => {
        //setLoading(true);
        user
          .updatePassword(pass)
          .then(() => {
            db.collection("users")
              .doc(user.uid)
              .update({ pass: pass })
              .then(() => {
                navigation.goBack();
                //navigation.navigate("Profile");
                setLoading(false);
              })
              .catch((error) => {
                alert(error.message);
                setLoading(false);
              });
            // Update successful.
            //navigation.goBack();
            //setLoading(false);
          })
          .catch((error) => {
            alert(error.message);
            setLoading(false);
            // An error ocurred
            // ...
          });
        // User re-authenticated.
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
        // An error ocurred
        // ...
      });

    // user
    // .updatePassword(pass)
    // .then(() => {
    //   // Update successful.
    //   navigation.goBack();
    //   setLoading(false);
    // })
    // .catch((error) => {
    //   alert(error.message);
    //   setLoading(false);
    //   // An error ocurred
    //   // ...
    // });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.b1}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: "B", fontSize: rfp(2.2) }}>
            Edit Profile
          </Text>
          <TouchableOpacity style={styles.b2} onPress={() => onDone()}>
            <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading2 == false ? (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ marginVertical: hp("2%") }}>
              <View style={styles.midw}>
                <View style={styles.mid}>
                  <View style={styles.profile}>
                    {images.length >= 1 ? (
                      <>
                        <TouchableOpacity
                          style={styles.removeImg}
                          onPress={() => onRemove(0)}
                        >
                          <FontAwesome
                            name="times"
                            size={wp("3.5%")}
                            color="white"
                          />
                        </TouchableOpacity>
                        <Image
                          source={{ uri: images[0] }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </>
                    ) : (
                      <Image
                        source={{ uri: uData?.profile }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.cprofile}
                    onPress={() => pickImage()}
                  >
                    <Text
                      style={{
                        fontFamily: "B",
                        color: "#58BFE6",
                        fontSize: rfp(2),
                      }}
                    >
                      Change Profile Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginVertical: hp("0%") }}>
                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        Name
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        maxLength={18}
                        placeholder="Name"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        defaultValue={uData?.name}
                        onChangeText={(val) =>
                          setName(val.replace(/\s+/g, " ").trim())
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        Occupation
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        maxLength={18}
                        placeholder="Occupation"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        defaultValue={uData?.occupation}
                        onChangeText={(val) =>
                          setOcc(val.replace(/\s+/g, " ").trim())
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        Bio
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        maxLength={42}
                        placeholder="Bio"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        defaultValue={uData?.bio}
                        onChangeText={(val) =>
                          setBio(val.replace(/\s+/g, " ").trim())
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        New Password
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        secureTextEntry={true}
                        placeholder="New Password"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        onChangeText={(val) => setPass(val)}
                        //defaultValue="12345"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        Confirm Password
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        secureTextEntry={true}
                        placeholder="Confirm Password"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        onChangeText={(val) => setcPass(val)}
                        //defaultValue="12345"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //backgroundColor: '#58BFE6',
  },

  headerWrapper: {
    height: StatusBar.currentHeight + hp("10%"),
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    backgroundColor: "#EFF3F5",
    //justifyContent: 'flex-end',
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("90%"),
    height: hp("10%"),
    //backgroundColor: 'red',
    flexDirection: "row",
    //borderRadius: wp('100%'),
    //borderBottomLeftRadius: wp('100%'),
    //borderBottomRightRadius: wp('100%'),
    //borderTopRightRadius: wp('100%'),
    //transform: [{ scaleX: 1.1 }],
    //transform: [{ scaleY: 1.1 }],
    //justifyContent: 'center'
  },
  b1: {
    width: wp("20%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  b2: {
    width: wp("20%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },

  midw: {
    height: hp("25%"),
    //backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  mid: {
    width: wp("90%"),
    height: hp("25%"),
    //backgroundColor: 'blue',
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  profile: {
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: wp("100%"),
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#58BFE6",
    overflow: "hidden",
  },
  cprofile: {
    //backgroundColor: 'red',
    //width: wp('35%'),
    //height: wp('25%'),
  },

  fw: {
    height: hp("10%"),
    //backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  f: {
    width: wp("90%"),
    height: hp("9%"),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  f1: {
    width: wp("35%"),
    height: hp("9%"),
    //backgroundColor: 'green',
    justifyContent: "center",
    //alignItems: 'center',
  },
  f2: {
    width: wp("51%"),
    height: hp("9%"),
    //backgroundColor: 'pink',
    justifyContent: "center",
    //alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  removeImg: {
    position: "absolute",
    width: wp("5%"),
    height: wp("5%"),
    backgroundColor: "red",
    zIndex: 999999,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "white",
  },
});
