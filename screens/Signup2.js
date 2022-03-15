import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import SignupB from "../components/SignupB";
import SignupH from "../components/SignupH";

export default function Signup2({ navigation, route }) {
  const [group = "pe", setGroup] = useState();
  const [shift = "morning", setShift] = useState();
  const [rollNo = "", setRollNo] = useState();

  let pData = route.params.data;

  // const onNext = () => {
  //   if (group != null && shift != null && rollNo != null) {
  //     if (rollNo.length == 3) {
  //       let data = {
  //         name: pData.name,
  //         batch: pData.batch,
  //         dept: pData.dept,
  //         group: group,
  //         shift: shift,
  //         rollNo: rollNo,
  //       };
  //       navigation.navigate("Signup3", { data: data });
  //     }
  //   }
  // };

  const onNext = () => {
    if (rollNo != "") {
      if (rollNo.length == 3) {
        let data = {
          name: pData.name,
          batch: pData.batch,
          dept: pData.dept,
          group: group,
          shift: shift,
          rollNo: rollNo,
        };
        navigation.navigate("Signup3", { data: data });
      } else {
        alert("Roll no must contain 3 numbers");
      }
    } else {
      alert("Fill all details");
    }
  };

  return (
    <View style={styles.container}>
      <SignupH navigation={navigation} />
      <ScrollView>
        <View style={styles.midw}>
          <View style={styles.mid}>
            <View style={styles.box}>
              <Picker
                style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                selectedValue={group}
                onValueChange={(itemValue, itemIndex) => setGroup(itemValue)}
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
              {/* <TextInput
              placeholder="Group"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              style={{ flex: 1, fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
              onChangeText={(val) => setGroup(val)}
            /> */}
            </View>
            <View style={styles.box}>
              <Picker
                style={{ fontSize: rfp(2), fontFamily: "M", color: "#fff" }}
                selectedValue={shift}
                onValueChange={(itemValue, itemIndex) => setShift(itemValue)}
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
              {/* <TextInput
              placeholder="Shift"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              style={{
                flex: 1,
                fontSize: rfp(2),
                fontFamily: "M",
                color: "#fff",
              }}
              onChangeText={(val) => setShift(val)}
            /> */}
            </View>
            <View style={styles.box}>
              <TextInput
                placeholder="Roll No"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                style={{
                  flex: 1,
                  fontSize: rfp(2),
                  fontFamily: "M",
                  color: "#fff",
                }}
                onChangeText={(val) => setRollNo(val)}
                keyboardType="number-pad"
                maxLength={3}
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
