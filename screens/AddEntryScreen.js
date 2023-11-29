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
  const [chipSound, setChipSound] = useState(false);

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
        <Text style={styles.entryHeader}>Event Type:</Text>
        <RadioButton.Group
          onValueChange={(checkedEvent) => setCheckedEvent(checkedEvent)}
          value={checkedEvent}
        >
          <RadioButton.Item label="Migraine without Aura" value="Migraine" />
          <RadioButton.Item label="Migraine with Aura" value="Aura Migraine" />
        </RadioButton.Group>
        <Text style={styles.entryHeader}>Entry Date:</Text>
        <TextInput
          label="MM/DD/YYYY"
          onChangeText={setEventDate}
          value={eventDate}
        />
        <Text style={styles.entryHeader}>Symptoms:</Text>
        <View style={styles.chipGrid}>
          <Chip
            onPress={() => setSymptoms([...symptoms, "Pain"])}
            style={styles.chipItem}
          >
            Pain
          </Chip>
          <Chip
            onPress={() => setSymptoms([...symptoms, "Fatigue"])}
            style={styles.chipItem}
          >
            Fatigue
          </Chip>
          <Chip
            onPress={() => setSymptoms([...symptoms, "Nausea"])}
            style={styles.chipItem}
          >
            Nausea
          </Chip>
          <Chip
            onPress={() => setSymptoms([...symptoms, "Vomiting"])}
            style={styles.chipItem}
          >
            Vomiting
          </Chip>
          <Chip
            onPress={() => setSymptoms([...symptoms, "Light sensitivity"])}
            style={styles.chipItem}
          >
            Light sensitivty
          </Chip>
          <Chip
            selected={chipSound}
            onPress={() => setSymptoms([...symptoms, "Sound sensitivity"])}
            style={styles.chipItem}
          >
            Sound sensitivty
          </Chip>
          <Chip
            onPress={() => setSymptoms([...symptoms, "Brain fog"])}
            style={styles.chipItem}
          >
            Brain fog
          </Chip>
        </View>
      </ScrollView>
      <View style={styles.btnRow}>
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
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  entryHeader: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: "bold",
    color: "#A37C40",
  },
  button: {
    margin: 10,
    backgroundColor: "#98473E",
  },
  chipGrid: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  chipItem: {
    margin: 5,
    backgroundColor: "#B49082",
  },
  btnRow: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
