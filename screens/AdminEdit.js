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

export default function AdminEdit(props) {
  //console.log(props.route.params.id);
  const [images, setImages] = useState([]);
  const [uData = "", setUData] = useState();
  const [name = "", setName] = useState();
  const [occ = "", setOcc] = useState();
  const [bio = "", setBio] = useState();
  const [batch = "", setBatch] = useState();
  const [dept = "", setDept] = useState();
  const [group = "", setGroup] = useState();
  const [shift = "", setShift] = useState();
  const [rollno = "", setRollNo] = useState();
  const [idno = "", setIdNo] = useState();
  const [gender = "", setGender] = useState();

  const [infoUpdate, setinfoUpdate] = useState(false);
  const [picUpdate, setpicUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);

  var db = firebase.firestore();
  //const user = firebase.auth().currentUser;

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
    var docRef = db.collection("users").doc(props.route.params.id);

    docRef
      .get()
      .then((userData) => {
        if (userData.data().accountType == "student") {
          setUData(userData.data());
          setName(userData.data().name);
          setOcc(userData.data().occupation);
          setBio(userData.data().bio);
          setBatch(userData.data().batch);
          setDept(userData.data().dept);
          setGroup(userData.data().group);
          setShift(userData.data().shift);
          setRollNo(userData.data().rollNo);
          setGender(userData.data().gender);
          setLoading2(false);
        } else {
          setUData(userData.data());
          setName(userData.data().name);
          setOcc(userData.data().occupation);
          setBio(userData.data().bio);
          setDept(userData.data().dept);
          setIdNo(userData.data().idNo);
          setGender(userData.data().gender);
          setLoading2(false);
        }
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
    if (uData?.accountType == "student") {
      if (
        name != "" &&
        occ != "" &&
        bio != "" &&
        batch != "" &&
        dept != "" &&
        group != "" &&
        shift != "" &&
        rollno != "" &&
        gender != ""
      ) {
        if (name?.length >= 6) {
          if (batch?.length == 4) {
            if (rollno?.length == 3) {
              if (
                name == uData?.name &&
                occ == uData?.occupation &&
                bio == uData?.bio &&
                batch == uData?.batch &&
                dept == uData?.dept &&
                group == uData?.group &&
                shift == uData?.shift &&
                rollno == uData?.rollNo &&
                gender == uData?.gender
              ) {
                setinfoUpdate(false);
                checkImage(false);
                //checkPass(false);
              } else {
                setinfoUpdate(true);
                checkImage(true);
                //checkPass(true);
              }
            } else {
              alert("Roll no must have 3 numbers");
              setLoading(false);
            }
          } else {
            alert("Batch must have 4 characters");
            setLoading(false);
          }
        } else {
          alert("Name must contain atleast 6 characters");
          setLoading(false);
        }
      } else {
        alert("Fill all details");
        setLoading(false);
      }
    } else {
      if (
        name != "" &&
        occ != "" &&
        bio != "" &&
        dept != "" &&
        idno != "" &&
        gender != ""
      ) {
        if (name?.length >= 6) {
          if (idno?.length == 3) {
            if (
              name == uData?.name &&
              occ == uData?.occupation &&
              bio == uData?.bio &&
              dept == uData?.dept &&
              idno == uData?.idNo &&
              gender == uData?.gender
            ) {
              setinfoUpdate(false);
              checkImage(false);
              //checkPass(false);
            } else {
              setinfoUpdate(true);
              checkImage(true);
              //checkPass(true);
            }
          } else {
            alert("Id no must have 3 numbers");
            setLoading(false);
          }
        } else {
          alert("Name must contain atleast 6 characters");
          setLoading(false);
        }
      } else {
        alert("Fill all details");
        setLoading(false);
      }
    }
  };

  const checkImage = (info) => {
    if (images.length >= 1) {
      //var recievedImages=("");
      images.map(async (item, index) => {
        var imgName =
          props.route.params.id + Math.floor(Math.random() * 127212);
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
                update(info, true, url);
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
      update(info, false, uData?.profile);
    }
  };

  const update = (info, pic, url) => {
    try {
      if (info == true || pic == true) {
        updateInfo(url);
      } else {
        props.navigation.goBack();
        setLoading(false);
      }
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  };

  const updateInfo = (url) => {
    try {
      if (uData?.accountType == "student") {
        db.collection("users")
          .doc(props.route.params.id)
          .update({
            name: name,
            occupation: occ,
            bio: bio,
            profile: url,
            batch: batch,
            dept: dept,
            group: group,
            shift: shift,
            rollNo: rollno,
            gender: gender,
          })
          .then(() => {})
          .catch((error) => {
            alert(error.message);
            setLoading(false);
          });

        db.collection("posts")
          .where("authorUid", "==", props.route.params.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().postType == "public") {
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
              } else {
                doc.ref
                  .update({
                    authorName: name,
                    authorOccupation: occ,
                    profile: url,
                    batch: batch,
                    dept: dept,
                    group: group,
                    shift: shift,
                  })
                  .then(() => {})
                  .catch((error) => {
                    alert(error.message);
                    setLoading(false);
                  });
              }
            });
          })
          .catch((error) => {
            alert(error.message);
            setLoading(false);
          });
      } else {
        db.collection("users")
          .doc(props.route.params.id)
          .update({
            name: name,
            occupation: occ,
            bio: bio,
            profile: url,
            dept: dept,
            idNo: idno,
            gender: gender,
          })
          .then(() => {})
          .catch((error) => {
            alert(error.message);
            setLoading(false);
          });

        db.collection("posts")
          .where("authorUid", "==", props.route.params.id)
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
      }

      db.collection("comments")
        .where("authorUid", "==", props.route.params.id)
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
        .where("users", "array-contains", props.route.params.id)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().sender == props.route.params.id) {
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

          props.navigation.goBack();
          setLoading(false);
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    } catch (e) {
      alert(e.message);
    }
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
            onPress={() => props.navigation.goBack()}
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
                {uData?.accountType == "student" && (
                  <View style={styles.fw}>
                    <View style={styles.f}>
                      <View style={styles.f1}>
                        <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                          Batch
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.f2}>
                        <TextInput
                          maxLength={4}
                          placeholder="Batch"
                          style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                          defaultValue={uData?.batch}
                          onChangeText={(val) => setBatch(val.trim())}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        Department
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        placeholder="Department"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        defaultValue={uData?.dept}
                        onChangeText={(val) => setDept(val.trim())}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {uData?.accountType == "student" && (
                  <>
                    <View style={styles.fw}>
                      <View style={styles.f}>
                        <View style={styles.f1}>
                          <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                            Group
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.f2}>
                          <TextInput
                            placeholder="Group"
                            style={{
                              flex: 1,
                              fontFamily: "R",
                              fontSize: rfp(2),
                            }}
                            defaultValue={uData?.group}
                            onChangeText={(val) => setGroup(val.trim())}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.fw}>
                      <View style={styles.f}>
                        <View style={styles.f1}>
                          <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                            Shift
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.f2}>
                          <TextInput
                            placeholder="Shift"
                            style={{
                              flex: 1,
                              fontFamily: "R",
                              fontSize: rfp(2),
                            }}
                            defaultValue={uData?.shift}
                            onChangeText={(val) => setShift(val.trim())}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}

                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        {uData?.accountType == "student" ? "Roll No" : "Id No"}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      {uData?.accountType == "student" ? (
                        <TextInput
                          placeholder="Roll No"
                          style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                          defaultValue={uData?.rollNo}
                          onChangeText={(val) => setRollNo(val.trim())}
                          keyboardType="number-pad"
                          maxLength={3}
                        />
                      ) : (
                        <TextInput
                          placeholder="Id No"
                          style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                          defaultValue={uData?.idNo}
                          onChangeText={(val) => setIdNo(val.trim())}
                          keyboardType="number-pad"
                          maxLength={3}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.fw}>
                  <View style={styles.f}>
                    <View style={styles.f1}>
                      <Text style={{ fontFamily: "B", fontSize: rfp(2) }}>
                        Gender
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.f2}>
                      <TextInput
                        placeholder="Gender"
                        style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
                        defaultValue={uData?.gender}
                        onChangeText={(val) => setGender(val.trim())}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={styles.fw}>
                <View style={styles.f}>
                  <View style={styles.f1}>
                    <Text style={{ fontFamily: "B" ,fontSize: rfp(2),}}>Email</Text>
                  </View>
                  <TouchableOpacity style={styles.f2}>
                    <TextInput
                      placeholder="Email"
                      style={{ flex: 1, fontFamily: "R",fontSize: rfp(2), }}
                      defaultValue="sumairlaghari@gmail.com"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.fw}>
                <View style={styles.f}>
                  <View style={styles.f1}>
                    <Text style={{ fontFamily: "B",fontSize: rfp(2), }}>New Password</Text>
                  </View>
                  <TouchableOpacity style={styles.f2}>
                    <TextInput
                      secureTextEntry={true}
                      placeholder="New Password"
                      style={{ flex: 1, fontFamily: "R" ,fontSize: rfp(2),}}
                      defaultValue="12345"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.fw}>
                <View style={styles.f}>
                  <View style={styles.f1}>
                    <Text style={{ fontFamily: "B" ,fontSize: rfp(2),}}>Confirm Password</Text>
                  </View>
                  <TouchableOpacity style={styles.f2}>
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Confirm Password"
                      style={{ flex: 1, fontFamily: "R" ,fontSize: rfp(2),}}
                      defaultValue="12345"
                    />
                  </TouchableOpacity>
                </View>
              </View> */}
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
    //marginVertical: hp("1%"),
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
