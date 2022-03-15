//import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  ScrollView,
  Animated,
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
export default function Post({ navigation }) {
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]);
  const [document, setDocument] = useState([]);
  //const [dName, setdName] = useState([]);
  const [postType, setPostType] = useState("public");
  const [uData = "", setUData] = useState();
  const [loading, setLoading] = useState(false);
  const [pOptions, setPOptions] = useState(false);
  const [batch = "2k20", setBatch] = useState();
  const [dept = "cs", setDept] = useState();
  const [group = "pe", setGroup] = useState();
  const [shift = "morning", setShift] = useState();
  const [ops = 0, setOps] = useState();
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      let newArr = images.concat(result.uri);
      setImages(newArr);
    }
  };

  const pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/*",
    });

    if (result.type === "success") {
      if (Platform.OS === "android" && result.uri[0] === "/") {
        result.uri = `file://${result.uri}`;
        result.uri = result.uri.replace(/%/g, "%25");
      }
      //console.log(result);
      let newArr = document.concat(result);
      setDocument(newArr);
      //let newArr2 = dName.concat(result.name);
      //setdName(newArr2);
    }
  };

  const onRemoveDoc = (id) => {
    var array = [...document];
    if (id !== -1) {
      array.splice(id, 1);
      setDocument(array);
    }
    // var array2 = [...dName];
    // if (id !== -1) {
    //   array2.splice(id, 1);
    //   setdName(array2);
    // }
  };

  const onRemove = (id) => {
    var array = [...images];
    if (id !== -1) {
      array.splice(id, 1);
      setImages(array);
    }
  };

  const onPostLoad = () => {
    if (images.length >= 1) {
      uploadImages();
    } else if (document.length >= 1) {
      uploadDocuments(images);
    } else {
      onPost(images, document);
    }
  };

  const uploadImages = () => {
    setLoading(true);
    let recievedImages = [];
    let count = 0;
    //console.log(images.length)
    images.map(async (item, index) => {
      var imgName = user.uid + Math.floor(Math.random() * 127212);
      const response = await fetch(item);
      const blob = await response.blob();
      var ref = firebase.storage().ref("postImages/post/" + imgName + ".jpg");

      ref
        .put(blob)
        .then((res) => {
          ref
            .getDownloadURL()
            .then((url) => {
              recievedImages.push(url);
              //console.log(index)
              count = count + 1;
              if (count == images.length) {
                if (document.length >= 1) {
                  uploadDocuments(recievedImages);
                } else {
                  onPost(recievedImages, document);
                }
              } else {
                //console.log("not matched"+ count)
              }
            })
            .catch((e) => {
              //console.log(e.message);
              alert(e.message);
            });
        })
        .catch((e) => {
          //console.log(e.message);
          alert(e.message);
        });
    });
  };

  const uploadDocuments = (rImages) => {
    setLoading(true);
    let recievedDocs = [];
    let count = 0;
    //console.log(images.length)
    document.map(async (item, index) => {
      var docName = item.name + user.uid + Math.floor(Math.random() * 127212);
      const response = await fetch(item.uri);
      const blob = await response.blob();
      var ref = firebase.storage().ref("postDocs/documents/" + docName);

      ref
        .put(blob)
        .then((res) => {
          ref
            .getDownloadURL()
            .then((url) => {
              recievedDocs.push({ url: url, name: item.name });
              //console.log(index)
              count = count + 1;
              if (count == document.length) {
                onPost(rImages, recievedDocs);
              } else {
                //console.log("not matched"+ count)
              }
            })
            .catch((e) => {
              //console.log(e.message);
              alert(e.message);
            });
        })
        .catch((e) => {
          //console.log(e.message);
          alert(e.message);
        });
    });
  };

  const onPost = async (rImages, rDocuments) => {
    setLoading(true);

    if (postText != "" || images.length != 0 || document.length != 0) {
      // Add a new document with a generated id.
      //console.log(postText,images.length);
      if (uData.accountType == "teacher" && postType == "private") {
        db.collection("posts")
          .add({
            postText: postText,
            images: rImages,
            document: rDocuments,
            postType: postType,
            comments: 0,
            createdAt: new Date(),
            author: user.email,
            authorName: uData.name,
            authorAccountType: uData.accountType,
            authorOccupation: uData.occupation,
            authorUid: user.uid,
            batch: batch,
            dept: dept,
            shift: shift,
            group: group,
            profile: uData.profile,
          })
          .then((docRef) => {
            alert("Post Sucessfull");
            navigation.navigate("Privatefeed");
            setLoading(false);
          })
          .catch((error) => {
            alert("Something went wrong!");
            setLoading(false);
          });
      } else if (uData.accountType == "student" && postType == "private") {
        db.collection("posts")
          .add({
            postText: postText,
            images: rImages,
            document: rDocuments,
            postType: postType,
            comments: 0,
            createdAt: new Date(),
            author: user.email,
            authorName: uData.name,
            authorAccountType: uData.accountType,
            authorOccupation: uData.occupation,
            authorUid: user.uid,
            batch: uData.batch,
            dept: uData.dept,
            shift: uData.shift,
            group: uData.group,
            profile: uData.profile,
          })
          .then((docRef) => {
            alert("Post Sucessfull");
            navigation.navigate("Privatefeed");
            setLoading(false);
          })
          .catch((error) => {
            alert("Something went wrong!");
            setLoading(false);
          });
      } else {
        db.collection("posts")
          .add({
            postText: postText,
            images: rImages,
            document: rDocuments,
            postType: postType,
            comments: 0,
            createdAt: new Date(),
            author: user.email,
            authorName: uData.name,
            authorAccountType: uData.accountType,
            authorOccupation: uData.occupation,
            authorUid: user.uid,
            profile: uData.profile,
          })
          .then((docRef) => {
            alert("Post Sucessfull");
            navigation.navigate("Newsfeed");
            setLoading(false);
          })
          .catch((error) => {
            alert("Something went wrong!");
            alert(error.message);
            setLoading(false);
          });
      }
    } else {
      alert("fill all details");
      setLoading(false);
    }
  };

  const ShowOptions = () => {
    if (ops == 0) {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setOps(1);
    } else {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setOps(0);
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
      <View style={styles.hw}>
        <View style={styles.h}>
          <TouchableOpacity
            style={styles.b1}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
              Discard
            </Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: "B", color: "#fff", fontSize: rfp(2.2) }}>
            CREATE
          </Text>
          <TouchableOpacity style={styles.b2} onPress={() => onPostLoad()}>
            <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
              Publish
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mw}>
        <ScrollView style={styles.m}>
          <View style={styles.postdata}>
            <TextInput
              placeholder="What's on your mind?"
              multiline={true}
              style={{
                flex: 1,
                fontSize: rfp(2),
                fontFamily: "R",
                textAlignVertical: "top",
              }}
              onChangeText={(val) => setPostText(val.trim())}
            />
          </View>
          <View style={styles.postoption}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => ShowOptions()}
            >
              <MaterialIcons name="add-circle" size={wp("8")} color="#58BFE6" />
            </TouchableOpacity>
            <Animated.View style={{ opacity: fadeAnim }}>
              {ops == 1 ? (
                <View style={styles.otheroption}>
                  <TouchableOpacity
                    style={styles.o2}
                    onPress={() =>
                      images.length > 2
                        ? alert("Image limit is 3")
                        : pickImage()
                    }
                  >
                    <MaterialIcons
                      name="add-a-photo"
                      size={wp("4%")}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.o2}
                    onPress={() =>
                      document.length > 2
                        ? alert("Document limit is 3")
                        : pickDoc()
                    }
                  >
                    <Ionicons name="document" size={wp("4%")} color="white" />
                  </TouchableOpacity>
                </View>
              ) : null}
            </Animated.View>
          </View>
          <View style={styles.imagesWrapper}>
            {images.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderRadius: wp("1%"),
                    borderWidth: 1,
                    width: hp("15%"),
                    height: hp("15%"),
                    marginRight: wp("5%"),
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#58BFE6",
                  }}
                >
                  <TouchableOpacity
                    style={styles.removeImg}
                    onPress={() => onRemove(index)}
                  >
                    <FontAwesome name="times" size={wp("3.5%")} color="white" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: item }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.DocWrapper}>
            {document.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    //borderRadius: wp("1%"),
                    //borderWidth: 1,
                    width: wp("86%"),
                    height: hp("6%"),
                    //backgroundColor:'green',
                    //marginRight: wp("5%"),
                    //overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    //borderColor: "#58BFE6",
                  }}
                >
                  <TouchableOpacity
                    style={styles.docremove}
                    onPress={() => onRemoveDoc(index)}
                  >
                    <FontAwesome name="times" size={wp("3.5%")} color="white" />
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#58BFE6",
                      borderRadius: wp("1%"),
                      width: wp("82%"),
                      height: hp("4%"),
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ marginLeft: wp("4%"), color: "red" }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {/* <Image
                    source={{ uri: item }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  /> */}
                </View>
              );
            })}
          </View>
          {uData.accountType == "teacher" && postType == "private" ? (
            <View style={{ width: wp("90%"), marginVertical: hp("2%") }}>
              <View style={styles.pWrap}>
                <View style={styles.pOption}>
                  <Picker
                    style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                    selectedValue={batch}
                    onValueChange={(itemValue, itemIndex) =>
                      setBatch(itemValue)
                    }
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item
                      label="2K20"
                      value="2k20"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                    <Picker.Item
                      label="2K19"
                      value="2k19"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                    <Picker.Item
                      label="2K18"
                      value="2k18"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                  </Picker>
                </View>
                <View style={styles.pOption}>
                  <Picker
                    style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                    selectedValue={dept}
                    onValueChange={(itemValue, itemIndex) => setDept(itemValue)}
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item
                      label="Computer Science"
                      value="cs"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                    <Picker.Item
                      label="Mathematics"
                      value="math"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                  </Picker>
                </View>
              </View>
              <View style={styles.pWrap}>
                <View style={styles.pOption}>
                  <Picker
                    style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                    selectedValue={group}
                    onValueChange={(itemValue, itemIndex) =>
                      setGroup(itemValue)
                    }
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item
                      label="Pre-Engineering"
                      value="pe"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                    <Picker.Item
                      label="Pre-Medical"
                      value="pm"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                    <Picker.Item
                      label="Pre-Commerce"
                      value="pc"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                  </Picker>
                </View>
                <View style={styles.pOption}>
                  <Picker
                    style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                    selectedValue={shift}
                    onValueChange={(itemValue, itemIndex) =>
                      setShift(itemValue)
                    }
                    dropdownIconColor="#fff"
                  >
                    <Picker.Item
                      label="Morning"
                      value="morning"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                    <Picker.Item
                      label="Evening"
                      value="evening"
                      style={{ fontSize: rfp(2), fontFamily: "M" }}
                    />
                  </Picker>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View style={styles.bw}>
        {/* <TouchableOpacity style={styles.bo}onPress={() => setPostType("public")}>
              <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
                Public
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bo} onPress={() => setPostType("private")}>
              <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
                Private
              </Text>
            </TouchableOpacity> */}

        <View style={styles.b}>
          <TouchableOpacity
            style={[
              styles.bo,
              {
                backgroundColor: postType == "public" ? "#58BFE6" : "#4C525C",
              },
            ]}
            onPress={() => setPostType("public")}
          >
            <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
              Public
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.bo,
              {
                backgroundColor: postType == "private" ? "#58BFE6" : "#4C525C",
              },
            ]}
            onPress={() => setPostType("private")}
          >
            <Text style={{ fontFamily: "M", color: "#fff", fontSize: rfp(2) }}>
              Private
            </Text>
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
    //backgroundColor: '#58BFE6',
    backgroundColor: "#EFF3F5",
  },
  hw: {
    width: wp("100%"),
    //height: hp('10%'),
    height: StatusBar.currentHeight + hp("10%"),
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#4C525C",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: wp("10%"),
    borderBottomRightRadius: wp("10%"),
  },
  h: {
    width: wp("90%"),
    height: hp("13%"),
    //backgroundColor: 'green',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  b1: {
    width: wp("22%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  b2: {
    width: wp("22%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },

  mw: {
    width: wp("100%"),
    //height: hp('80%'),
    //height: hp("80%") - StatusBar.currentHeight,
    //backgroundColor: 'pink',
    flex: 1,
    //marginTop: hp("2%"),
    marginBottom: hp("10%"),
    alignItems: "center",
    //justifyContent: "center",
  },
  m: {
    width: wp("90%"),
    //height: hp('76%'),
    //height: hp("76%") - StatusBar.currentHeight,
    //backgroundColor: 'red',
    //alignItems: "center",
    //justifyContent: 'center',
  },
  postdata: {
    width: wp("90%"),
    height: hp("30%"),
    borderRadius: wp("2%"),
    backgroundColor: "white",
    paddingHorizontal: wp("2%"),
    paddingVertical: wp("2%"),
    borderColor: "#58BFE6",
    borderWidth: 1,
    marginTop: hp("2%"),
    //alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  postoption: {
    width: wp("90%"),
    height: hp("10%"),
    //backgroundColor: 'green',
    alignItems: "center",
    //justifyContent: 'center',
    flexDirection: "row",
  },
  option: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("100%"),
    backgroundColor: "#4C525C",
    //backgroundColor:'white',
    marginRight: wp("2%"),
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  otheroption: {
    width: wp("20%"),
    height: wp("9%"),
    borderRadius: wp("100%"),
    //backgroundColor: "#4C525C",
    //backgroundColor: 'white',
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    //borderWidth: 1,
    //borderColor: "white",
  },
  o2: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  bw: {
    width: wp("100%"),
    height: hp("10%"),
    backgroundColor: "#4C525C",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: wp("10%"),
    borderTopRightRadius: wp("10%"),
    position: "absolute",
    bottom: 0,
  },
  b: {
    width: wp("90%"),
    height: hp("10%"),
    //backgroundColor: 'pink',
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  bo: {
    width: wp("30%"),
    height: wp("10%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  imagesWrapper: {
    //backgroundColor: 'red',
    width: "100%",
    flexDirection: "row",
    //justifyContent:'space-evenly',
  },
  removeImg: {
    position: "absolute",
    width: wp("5%"),
    height: wp("5%"),
    backgroundColor: "#58BFE6",
    zIndex: 999999,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "white",
  },
  pOption: {
    //backgroundColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: "#58BFE6",
    //opacity: 0.2,
    height: hp("6%"),
    width: wp("44%"),
    //marginTop: hp('3%'),
    borderRadius: wp("100%"),
    borderWidth: 1,
    borderColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    overflow:"hidden",
    //paddingHorizontal: wp("4%"),
  },
  pWrap: {
    width: wp("90%"),
    //height: hp("10%"),
    //backgroundColor: 'pink',
    //alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  DocWrapper: {
    //backgroundColor: 'red',
    width: wp("90%"),
    alignItems: "center",
    marginTop: hp("1%"),
    //justifyContent:'center',
    //flexDirection: "row",
    //justifyContent:'space-evenly',
  },
  docremove: {
    position: "absolute",
    width: wp("5%"),
    height: wp("5%"),
    backgroundColor: "#58BFE6",
    zIndex: 999999,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "white",
    top: 0,
    left: 0,
  },
});
