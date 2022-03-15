import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
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
import NewsFeedCard from "../components/NewsFeedCard";
import TopMenu from "../components/TopMenu";
import * as firebase from "firebase";
export default function Newsfeed({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  var db = firebase.firestore();
  const user = firebase.auth().currentUser;

  // const [isFetching, setIsFetching] = useState(false);

  // const onRefresh = () => {
  //   setIsFetching(true);
  //   setIsFetching(false);
  // };

  useEffect(() => {
    try {
      db.collection("posts")
        .where("postType", "==", "public")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, data: doc.data() });
          });
          setPosts(data);
          setLoading(false);
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
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={posts}
            renderItem={(item, index) => {
              return (
                <NewsFeedCard
                  data={item.item.data}
                  id={item.item.id}
                  key={index}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            //onRefresh={onRefresh}
            //refreshing={isFetching}
          />
        )}
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
    marginBottom: hp("10%"),
    flex: 1,
    //backgroundColor:'red'
    //height: hp("80%") - StatusBar.currentHeight,
    //height: hp('76.7%'),
    //marginTop: hp("5%"),
    //marginBottom: hp("20%"),
    //backgroundColor: 'red',
    //paddingVertical: hp('1%'),
  },
});
