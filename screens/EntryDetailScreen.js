import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  List,
  ActivityIndicator,
  Chip,
} from "react-native-paper";
import { auth, db } from "../firebaseConfig";
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

export default function EntryDetailScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [entryData, setEntryData] = useState({});
  const [checkedEvent, setCheckedEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const { id } = route.params;

  const getEntry = async () => {
    setLoading(true);
    const docRef = doc(db, "entries", id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEntryData(docSnap.data());
        setCheckedEvent(docSnap.data().event);
        setEventDate(docSnap.data().entryDate);
        setSymptoms(docSnap.data().symptoms);
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Try error ", error.message);
      errorText = error.message;
    }
  };

  useEffect(() => {
    getEntry();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Entry Detail Screen</Text>
      <View>
        <ActivityIndicator size="large" color="#A37C40" animating={loading} />
      </View>
      <Text>{checkedEvent}</Text>
      <Text>{eventDate}</Text>
      <View>
        {symptoms.map((symptom, idx) => (
          <Text>{symptom}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
