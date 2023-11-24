import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  getDocs,
  addDoc,
  where,
  query,
  doc,
  QuerySnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function MemberScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Greetings, {auth.currentUser.displayName}!
      </Text>
      <Button
        style={styles.button}
        title="New Entry"
        onPress={() => {
          navigation.navigate("addEntry");
        }}
        mode="contained"
      >
        New Entry
      </Button>
      <View></View>

      <Button
        style={styles.button}
        title="Sign Out"
        onPress={() => {
          navigation.navigate("home");
          signOut(auth);
        }}
        mode="contained"
      >
        Return home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B49082",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#98473E",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
});
