import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  List,
  ActivityIndicator,
  Chip,
  RadioButton,
} from "react-native-paper";
import { auth, db } from "../firebaseConfig";
import {
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
  const [canEdit, setCanEdit] = useState(false);
  const [checkedEvent, setCheckedEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptoms, setCurrentSymptoms] = useState([]);

  const { id } = route.params;

  const getEntry = async () => {
    setLoading(true);
    const docRef = doc(db, "entries", id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCheckedEvent(docSnap.data().event);
        setEventDate(docSnap.data().entryDate);
        setCurrentSymptoms(docSnap.data().symptoms);
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

  const editEntry = async () => {
    const editEntry = {
      memberEmail: `${auth.currentUser.email}`,
      entryDate: `${eventDate}`,
      event: `${checkedEvent}`,
      symptoms: symptoms,
    };
    try {
      const updateEntryRef = doc(db, "entries", id);
      await updateDoc(updateEntryRef, editEntry);
      alert("Edit successful");
      getEntry();
      setCanEdit(false);
    } catch (e) {
      alert(e);
    }
  };

  const deleteEntry = async () => {
    try {
      await deleteDoc(doc(db, "entries", id));
      alert("Delete successful");
      navigation.navigate("member");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Entry Detail Screen</Text>
      <View>
        <ActivityIndicator size="large" color="#A37C40" animating={loading} />
      </View>
      <ScrollView style={styles.innerContainer}>
        <Text style={styles.entryHeader}>Event Type:</Text>
        <RadioButton.Group
          onValueChange={(checkedEvent) => setCheckedEvent(checkedEvent)}
          value={checkedEvent}
        >
          <RadioButton.Item
            label="Migraine"
            value="Migraine"
            color="#98473E"
            disabled={canEdit ? false : true}
            labelStyle={styles.disabledItem}
          />
          <RadioButton.Item
            label="Aura Migraine"
            value="Aura Migraine"
            color="#98473E"
            disabled={canEdit ? false : true}
            labelStyle={styles.disabledItem}
          />
        </RadioButton.Group>
        <Text style={styles.entryHeader}>Entry Date:</Text>
        <TextInput
          label="MM/DD/YYYY"
          onChangeText={setEventDate}
          value={eventDate}
          disabled={canEdit ? false : true}
          textColor="#07090F"
        />
        <Text style={styles.entryHeader}>Symptoms</Text>
        {canEdit ? (
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
        ) : (
          <View style={styles.chipGrid}>
            {currentSymptoms.map((symptom, idx) => (
              <Chip style={styles.chipItem}>{symptom}</Chip>
            ))}
          </View>
        )}
      </ScrollView>
      {canEdit ? (
        <View style={styles.btnRow}>
          <Button
            style={styles.button}
            title="edit"
            onPress={() => {
              editEntry();
            }}
            mode="contained"
          >
            Save Edits
          </Button>
          <Button
            style={styles.button}
            title="Delete"
            onPress={() => {
              deleteEntry();
            }}
            mode="contained"
          >
            Delete entry
          </Button>
          <Button
            style={styles.button}
            title="cancel"
            onPress={() => {
              setCanEdit(false);
            }}
            mode="contained"
          >
            Cancel
          </Button>
        </View>
      ) : (
        <View>
          <Button
            style={styles.button}
            title="Delete"
            onPress={() => {
              setCanEdit(true);
            }}
            mode="contained"
          >
            Edit entry
          </Button>
          <Button
            style={styles.button}
            title="Back to Lists"
            onPress={() => {
              navigation.navigate("member");
            }}
            mode="contained"
          >
            Return
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6C3C9",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
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
  disabledItem: {
    color: "#07090F",
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
  },
});
