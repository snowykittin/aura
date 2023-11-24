import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, List, ActivityIndicator } from "react-native-paper";
import { auth, db } from "../firebaseConfig";
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
  const [loading, setLoading] = useState(false);

  const getEntriesFromFB = async () => {
    setLoading(true);
    const q = query(
      collection(db, "entries"),
      where("memberEmail", "==", auth.currentUser.email)
    );

    const querySnapshot = await getDocs(q);
    setEntries(querySnapshot.docs);
  };

  useEffect(() => {
    getEntriesFromFB().then(setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.header}>My Entries</Text>
        <Button
          style={styles.addButton}
          title="New Entry"
          onPress={() => {
            navigation.navigate("addEntry");
          }}
          mode="contained"
        >
          Add Entry
        </Button>
      </View>
      <ScrollView style={styles.entriesGrid}>
        <View>
          {entries.map((entry, idx) => (
            <List.Item
              title={entry.data().event}
              description={entry.data().entryDate}
              onPress={() => {
                navigation.navigate("entryDetail", {
                  id: entry.id,
                });
              }}
              left={(props) => <List.Icon {...props} icon="book" />}
            />
          ))}
        </View>
        <View>
          <ActivityIndicator size="large" color="#A37C40" animating={loading} />
        </View>
      </ScrollView>

      <Button
        style={styles.button}
        title="Sign Out"
        onPress={() => {
          navigation.navigate("home");
          signOut(auth);
        }}
        mode="contained"
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6C3C9",
    justifyContent: "space-between",
    alignItems: "center",
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
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    backgroundColor: "#B49082",
  },
  addButton: {
    backgroundColor: "#98473E",
  },
  entriesGrid: {
    flex: 1,
    minHeight: "60%",
    width: "90%",
  },
});
