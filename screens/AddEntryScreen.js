import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, RadioButton, Chip } from "react-native-paper";
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

export default function AddEntryScreen({ navigation }) {
  const [checkedEvent, setCheckedEvent] = useState("Migraine");
  const [eventDate, setEventDate] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const addNewEntry = async () => {
    const newEntry = {
      memberEmail: `${auth.currentUser.email}`,
      entryDate: `${eventDate}`,
      event: `${checkedEvent}`,
      symptoms: symptoms,
    };

    try {
      const docRef = await addDoc(collection(db, "entries"), newEntry);
      alert("Entry added");
      setCheckedEvent("Migraine");
      setEventDate("");
      setSymptoms([]);
      navigation.navigate("member");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Entry</Text>
      <ScrollView>
        <Text>Event Type:</Text>
        <RadioButton.Group
          onValueChange={(checkedEvent) => setCheckedEvent(checkedEvent)}
          value={checkedEvent}
        >
          <RadioButton.Item label="Migraine without Aura" value="Migraine" />
          <RadioButton.Item label="Migraine with Aura" value="Aura Migraine" />
        </RadioButton.Group>
        <Text>Entry Date:</Text>
        <TextInput
          label="MM/DD/YYYY"
          onChangeText={setEventDate}
          value={eventDate}
        />
        <Text>Symptoms:</Text>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Pain"])}
        >
          Pain
        </Chip>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Fatigue"])}
        >
          Fatigue
        </Chip>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Nausea"])}
        >
          Nausea
        </Chip>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Vomiting"])}
        >
          Vomiting
        </Chip>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Light sensitivity"])}
        >
          Light sensitivty
        </Chip>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Sound sensitivity"])}
        >
          Sound sensitivty
        </Chip>
        <Chip
          icon="information"
          onPress={() => setSymptoms([...symptoms, "Brain fog"])}
        >
          Brain fog
        </Chip>
      </ScrollView>
      <Button
        style={styles.button}
        title="Add Entry"
        onPress={addNewEntry}
        mode="contained"
      >
        Add Entry
      </Button>
      <Button
        style={styles.button}
        title="Add Entry"
        onPress={() => {
          navigation.navigate("member");
        }}
        mode="contained"
      >
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6C3C9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#98473E",
  },
});
