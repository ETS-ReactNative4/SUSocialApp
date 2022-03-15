import { Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
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
import * as firebase from "firebase";

export default function Signin({ navigation, route }) {
  const [email = "", setEmail] = useState();
  const [pass = "", setPass] = useState();
  const [loading, setLoading] = useState(false);
  var db = firebase.firestore();

  const onLogin = () => {
    setLoading(true);
    if (email != "" && pass != "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.data().pass != pass) {
                doc.ref
                  .update({ pass: pass })
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((e) => {
                    alert(e.message);
                    setLoading(false);
                  });
              } else {
                setLoading(false);
              }
            })
            .catch((e) => {
              alert(e.message);
              setLoading(false);
            });

          //var user = userCredential.user;
          //setLoading(false);
          //console.log(user.data);
          //console.log(userCredential.user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          setLoading(false);
          setEmail("");
          setPass("");
        });
    } else {
      alert("Fill all details");
      setLoading(false);
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
          <View style={styles.backbutton}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="back" size={wp("6%")} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            {route.params.role == "admin" ? (
              <Text style={styles.titletext}>Admin{"\n"}Panel</Text>
            ) : (
              <Text style={styles.titletext}>Welcome{"\n"}Back</Text>
            )}
          </View>
        </View>
        <View style={styles.secondCircle}></View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.mid}>
            <View style={styles.box}>
              <TextInput
                placeholder="Email"
                style={{ flex: 1, fontSize: rfp(2), fontFamily: "M" }}
                onChangeText={(val) => setEmail(val)}
              />
            </View>
            <View style={styles.box}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                style={{ flex: 1, fontSize: rfp(2), fontFamily: "M" }}
                onChangeText={(val) => setPass(val)}
              />
            </View>
            <View style={styles.box2}>
              <Text style={styles.boxtext2}>Sign In</Text>
              <TouchableOpacity style={styles.button} onPress={() => onLogin()}>
                <AntDesign name="arrowright" size={wp("6%")} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {route.params.role != "admin" && (
            <View style={styles.bottomw}>
              <View style={styles.bottom}>
                <TouchableOpacity
                  style={styles.btouch}
                  onPress={() =>
                    route.params.role == "teacher"
                      ? navigation.navigate("TSignup")
                      : navigation.navigate("Signup")
                  }
                >
                  <Text style={styles.bboxtext}>Sign Up</Text>
                  <View style={styles.bbox}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btouch}
                  onPress={() => navigation.navigate("Forgetpass")}
                >
                  <Text style={styles.bboxtext}>Forget Password</Text>
                  <View style={styles.bbox2}></View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    height: hp("50%"),
    //backgroundColor: 'red',
  },
  header: {
    width: wp("100%"),
    height: hp("45%"),
    backgroundColor: "#4C525C",
    borderBottomLeftRadius: wp("80%"),
    borderBottomRightRadius: wp("80%"),
    transform: [{ scaleX: 1.1 }],
    justifyContent: "center",
    //justifyContent: 'center',
    alignItems: "center",
    //paddingVertical:hp('5%')
  },
  backbutton: {
    width: wp("88%"),
    height: hp("9%"),
    //backgroundColor: 'red',
    //borderRadius: wp('100%'),
    justifyContent: "center",
    //alignItems: 'center',
  },
  touch: {
    width: wp("15%"),
    height: wp("15%"),
    //backgroundColor: 'yellow',
    borderRadius: wp("100%"),
    alignItems: "center",
    justifyContent: "center",
  },
  backbuttontext: {
    color: "white",
    fontSize: 20,
    //left: wp('16%'),
    //top: -hp('9%'),
  },
  title: {
    width: wp("76%"),
    height: hp("30%"),
    justifyContent: "center",
    //backgroundColor: 'pink',
  },
  titletext: {
    color: "#fff",
    //fontSize: 25,
    fontSize: rfp(3.5),
    fontFamily: "M",
    //left: wp('17%'),
    //top: hp('2%')
  },
  secondCircle: {
    width: wp("50%"),
    height: wp("50%"),
    backgroundColor: "#58BFE6",
    borderRadius: wp("100%"),
    position: "absolute",
    right: -wp("25%"),
    bottom: hp("2%"),
    zIndex: -1,
    transform: [{ scale: 1.2 }],
  },
  mid: {
    height: hp("35%"),
    //flex:1,
    //flexDirection:'row',
    alignItems: "center",
    //justifyContent:'space-around',
    //backgroundColor: 'green',
    //marginTop: hp('2%'),
  },
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    //opacity: 0.2,
    height: wp("14%"),
    width: wp("80%"),
    marginTop: hp("2%"),
    borderRadius: wp("6%"),
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
  },
  boxtext: {
    //backgroundColor: 'red',
    //marginLeft: wp('4%'),
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 13,
  },
  box2: {
    //backgroundColor: 'red',
    height: wp("15%"),
    width: wp("80%"),
    marginTop: hp("4%"),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  boxtext2: {
    //fontSize: 25,
    fontSize: rfp(3.5),
    color: "black",
    fontFamily: "M",
    //marginLeft: wp('3%'),
  },
  button: {
    backgroundColor: "#4C525C",
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 25,
    color: "white",
  },
  bottomw: {
    flex: 1,
    //width: wp('100%'),
    //height: hp('10%'),
    //backgroundColor:'green',
    alignItems: "center",
    //justifyContent: "flex-end",
  },
  bottom: {
    width: wp("95%"),
    //backgroundColor: 'red',
    //flex: 1,
    flexDirection: "row",
    marginTop: hp("4%"),
    alignItems: "center",
    justifyContent: "space-between",
  },
  btouch: {
    width: wp("38%"),
    height: wp("15%"),
    //backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("100%"),
  },
  bbox: {
    backgroundColor: "#58BFE6",
    width: wp("34%"),
    height: wp("2%"),
    //marginLeft: wp('8%'),
    //marginTop: hp('3%'),
    //alignItems: 'center',
  },
  bbox2: {
    backgroundColor: "#FFAE48",
    width: wp("34%"),
    height: wp("2%"),
    //marginRight: wp('8%'),
    //marginTop: hp('3%'),
    //alignItems: 'center',
  },
  bboxtext: {
    //fontSize: 15,
    fontSize: rfp(2),
    color: "black",
    fontFamily: "B",
    //marginTop: -hp('2%'),
  },
  bbox2text: {},
});
