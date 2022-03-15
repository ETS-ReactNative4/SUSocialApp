import React, { useState, useEffect } from "react";
import { AuthNavigator } from "./routes/AuthNavigator";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { ActivityIndicator, Alert, View } from "react-native";
import { UnAuthNavigator } from "./routes/UnAuthNavigator";
import { AdminNavigator } from "./routes/AdminNavigator";
import * as firebase from "firebase";
import { MenuProvider } from "react-native-popup-menu";
import {
  api_Key,
  auth_Domain,
  project_Id,
  storage_Bucket,
  messaging_Sender_Id,
  app_Id,
  measurement_Id,
  firebase_Admin_Uid,
} from "@env";

export default function App() {
  const [status, setStatus] = useState();
  const [uData, setuData] = useState();
  const [loading, setLoading] = useState(false);
  const firebaseConfig = {
    apiKey: api_Key,
    authDomain: auth_Domain,
    projectId: project_Id,
    storageBucket: storage_Bucket,
    messagingSenderId: messaging_Sender_Id,
    appId: app_Id,
    measurementId: measurement_Id,
  };

  useEffect(() => {
    try {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (e) {
      alert("Check your internet connection");
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoading(true);
        if (user.uid == firebase_Admin_Uid) {
          var uid = user.uid;
          setStatus("admin");
          setLoading(false);
        } else {
          check(user.uid);
          //var uid = user.uid;
          //setStatus("loggedIn");
        }
      } else {
        // User is signed out
        // ...
        //setLoading(true);
        setStatus("loggedOut");
        setLoading(false);
      }
    });
  }, []);

  const check = (data) => {
    //setLoading(true);
    var db = firebase.firestore();
    db.collection("users")
      .doc(data)
      .get()
      .then((d) => {
        setuData(d.data());
        if (d.data().active == "true") {
          setStatus("loggedIn");
          setLoading(false);
        } else {
          firebase
            .auth()
            .signOut()
            .then(() => {
              // Sign-out successful.
            })
            .catch((error) => {
              // An error happened.
            });
          alert("Sorry your account is disabled");
          //setLoading(false);
        }
      });
  };

  let [fontsLoaded] = useFonts({
    R: require("./assets/fonts/Montserrat-Regular.ttf"),
    M: require("./assets/fonts/Montserrat-Medium.ttf"),
    B: require("./assets/fonts/Montserrat-Bold.ttf"),
    L: require("./assets/fonts/Montserrat-ExtraLight.ttf"),
  });
  if (!fontsLoaded || loading == true || !status) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  } else {
    return (
      <>
        <MenuProvider>
          {status == "loggedIn" ? (
            <AuthNavigator />
          ) : status == "admin" ? (
            <AdminNavigator />
          ) : (
            <UnAuthNavigator />
          )}
        </MenuProvider>
      </>
    );
  }
}
