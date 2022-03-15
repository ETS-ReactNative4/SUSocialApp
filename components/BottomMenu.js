import React from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function BottomMenu({ navigation, route }) {
  return (
    <View style={styles.bottomw}>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate("Newsfeed")}
        >
          <MaterialCommunityIcons name="home" size={wp("7%")} color="#4C525C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate("Privatefeed")}
        >
          <MaterialCommunityIcons
            name="home-lock"
            size={wp("7%")}
            color="#4C525C"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate("Post")}
        >
          <MaterialIcons name="post-add" size={wp("7%")} color="#4C525C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate("Messages")}
        >
          <Entypo name="message" size={wp("7%")} color="#4C525C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate("Notification")}
        >
          <Ionicons name="notifications" size={wp("7%")} color="#4C525C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialCommunityIcons
            name="face-profile"
            size={wp("7%")}
            color="#4C525C"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomw: {
    height: hp("10%"),
    position: "absolute",
    bottom: 0,
    //backgroundColor:'red'
    //backgroundColor: '#4C525C',
  },
  bottom: {
    flexDirection: "row",
    backgroundColor: "#4C525C",
    width: wp("100%"),
    height: hp("10%"),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: wp("10%"),
    borderTopRightRadius: wp("10%"),
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#58BFE6",
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
