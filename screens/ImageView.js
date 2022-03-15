//import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";

export default function ImageView({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.uri }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
          //flex: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //overflow: "hidden",
  },
});
