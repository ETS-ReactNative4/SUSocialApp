import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import SignupB from "../components/SignupB";
import SignupH from "../components/SignupH";
import * as firebase from "firebase";
export default function Signup3({ navigation, route }) {
  const [gender = "male", setGender] = useState();
  const [email = "", setEmail] = useState();
  const [pass = "", setPass] = useState();
  const [loading, setLoading] = useState(false);
  var db = firebase.firestore();
  let pData = route.params.data;

  const onSubmit = (data) => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        db.collection("users")
          .doc(user.uid)
          .set({
            name: pData.name,
            batch: pData.batch,
            dept: pData.dept,
            group: pData.group,
            shift: pData.shift,
            rollNo: pData.rollNo,
            gender: gender,
            email: email,
            pass: pass,
            accountType: "student",
            bio: "my bio",
            occupation: "Student",
            active: "true",
            profile:
              "https://firebasestorage.googleapis.com/v0/b/socialapp-e7b5f.appspot.com/o/defaultProfile%2Fstudent.png?alt=media&token=0743e607-6098-4da9-bac4-599c9564e24c",
          })
          .then((docRef) => {
            setLoading(false);
            alert("Congrats! account has been created");
          })
          .catch((error) => {
            alert("Something went wrong!");
            setLoading(false);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setLoading(false);
        alert(errorMessage);
        setEmail("");
        setPass("");
        // ..
      });
  };

  // const onNext = () => {
  //   if (gender != null && email != null && pass != null) {
  //     if (pass.length >= 8) {
  //       let data = {
  //         name: pData.name,
  //         batch: pData.batch,
  //         dept: pData.dept,
  //         group: pData.group,
  //         shift: pData.shift,
  //         rollNo: pData.rollNo,
  //         gender: gender,
  //         email: email,
  //         pass: pass,
  //       };
  //       onSubmit(data);
  //     } else {
  //       alert("password must contain atleast 8 characters");
  //     }
  //   }
  // };

  const onNext = () => {
    if (email != "" && pass != "") {
      if (pass.length >= 8) {
        let data = {
          name: pData.name,
          batch: pData.batch,
          dept: pData.dept,
          group: pData.group,
          shift: pData.shift,
          rollNo: pData.rollNo,
          gender: gender,
          email: email,
          pass: pass,
        };
        onSubmit(data);
      } else {
        alert("Password must contain atleast 8 characters");
      }
    } else {
      alert("Fill all details");
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
      <SignupH navigation={navigation} />
      <ScrollView>
        <View style={styles.midw}>
          <View style={styles.mid}>
            <View style={styles.box}>
              <Picker
                style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                dropdownIconColor="#fff"
              >
                <Picker.Item
                  label="Male"
                  value="male"
                  style={{ fontSize: rfp(2), fontFamily: "M" }}
                />
                <Picker.Item
                  label="Female"
                  value="female"
                  style={{ fontSize: rfp(2), fontFamily: "M" }}
                />
              </Picker>
              {/* <TextInput
              placeholder="Gender"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              style={{ flex: 1, fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
              onChangeText={(val) => setGender(val)}
            /> */}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                style={{
                  flex: 1,
                  fontSize: rfp(2),
                  fontFamily: "M",
                  color: "#fff",
                }}
                onChangeText={(val) => setEmail(val)}
              />
            </View>
            <View style={styles.box}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                style={{
                  flex: 1,
                  fontSize: rfp(2),
                  fontFamily: "M",
                  color: "#fff",
                }}
                onChangeText={(val) => setPass(val)}
              />
            </View>
            <View style={styles.box2}>
              <Text style={styles.box2text}>Sign Up</Text>
              <TouchableOpacity style={styles.button} onPress={onNext}>
                <AntDesign name="arrowright" size={wp("6%")} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <SignupB navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#58BFE6",
  },

  midw: {
    height: hp("45%"),
    //flex:1,
    //flexDirection:'row',
    alignItems: "center",
    //justifyContent:'space-around',
    //backgroundColor: 'green',
    //marginTop: hp('2%'),
  },
  mid: {
    width: wp("90%"),
    height: hp("45%"),
    //backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    //opacity: 0.2,
    height: hp("8%"),
    width: wp("80%"),
    //marginTop: hp('3%'),
    borderRadius: wp("6%"),
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
    overflow:"hidden",
  },
  boxtext: {
    //marginLeft: wp('4%'),
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
  },
  box2: {
    //backgroundColor: 'yellow',
    height: hp("8%"),
    width: wp("80%"),
    //marginTop: hp('4%'),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  box2text: {
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
    borderRadius: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    //zIndex: 1,
  },
  arrow: {
    fontSize: 25,
    color: "white",
  },
});
