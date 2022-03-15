//import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert,
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
import { Picker } from "@react-native-picker/picker";
import SearchCard from "../components/SearchCard";
import UserListCard from "../components/UserListCard";

export default function UserList({ navigation }) {
  const [text = "", setText] = useState();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    if (text != "") {
      setLoading(true);
      db.collection("users")
        .orderBy("name")
        .startAt(text)
        .endAt(text + "\uf8ff")
        .get()
        .then((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
          });
          setCards(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          setLoading(false);
          alert(error.message);
        });
    } else {
      setLoading(true);
      db.collection("users")
        .orderBy("name")
        .get()
        .then((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
          });
          setCards(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          setLoading(false);
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hw}>
        <View style={styles.h}>
          <TouchableOpacity
            style={styles.b1}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={wp("6%")} color="#4C525C" />
          </TouchableOpacity>
          <View style={styles.search}>
            <TextInput
              placeholder="Search..."
              style={{ flex: 1, fontFamily: "R", fontSize: rfp(2) }}
              onChangeText={(val) => setText(val.trim())}
            />
          </View>
          <TouchableOpacity style={styles.b2} onPress={() => onSearch()}>
            <AntDesign name="arrowright" size={wp("6%")} color="#4C525C" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mw}>
        <ScrollView style={styles.m}>
          <View style={{ marginVertical: hp("2%") }}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                {cards.length >= 1
                  ? cards.map((item, index) => {
                      return (
                        <UserListCard
                          user={user.uid}
                          id={item.id}
                          data={item.data}
                          key={index}
                          navigation={navigation}
                        />
                      );
                    })
                  : null}
              </>
            )}
          </View>
        </ScrollView>
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
    //height: hp("15%"),
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
    //height: hp("15%"),
    //height: StatusBar.currentHeight + hp("15%"),
    height: hp("10%"),
    //backgroundColor: 'green',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  b1: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  b2: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("100%"),
    backgroundColor: "#58BFE6",
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  search: {
    width: wp("65%"),
    height: wp("11%"),
    borderRadius: wp("6%"),
    backgroundColor: "#EFF3F5",
    justifyContent: "center",
    paddingHorizontal: wp("2%"),
    borderWidth: 1,
    borderColor: "white",
  },

  mw: {
    width: wp("100%"),
    flex: 1,
    //height: hp("90%") - StatusBar.currentHeight,
    //backgroundColor: '#4C525C',
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: hp('2%'),
    //paddingTop: hp('5%'),
    //borderBottomLeftRadius: wp('10%'),
    //borderBottomRightRadius: wp('10%'),
  },
  m: {
    width: wp("90%"),
    //paddingVertical: hp('2%'),
    //marginVertical: hp('2%'),
    //height: hp("85%") - StatusBar.currentHeight,
    //paddingTop: hp('2%'),
    //backgroundColor: '#4C525C',
    //alignItems: 'center',
    //justifyContent: 'center',
    //borderBottomLeftRadius: wp('10%'),
    //borderBottomRightRadius: wp('10%'),
  },
});
