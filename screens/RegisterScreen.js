import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [createUserEmailAddress, setCreateUserEmailAddress] = useState();
  const [createUserPassword, setCreateUserPassword] = useState();
  const [loading, setLoading] = useState(false);

  const signInUser = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        createUserEmailAddress,
        createUserPassword
      )
        .then((userCredential) => {
          console.log("User signed in");

          setLoading(false);
          navigation.navigate("member");
        })
        .catch((error) => {
          console.log("Error ", error.message);
          Alert.alert(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log("Try error ", error.message);
      setLoading(false);
    }
  };

  const createUser = async () => {
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        createUserEmailAddress,
        createUserPassword
      )
        .then((userCredential) => {
          console.log("User created");
          setNewFirstName("");
          setNewLastName("");
          setCreateUserEmailAddress("");
          setCreateUserPassword("");

          signInUser();
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error ", error.message);
        });
    } catch (error) {
      console.log("Try error ", error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to My Business</Text>
        <View>
          <Text style={styles.smallHeader}>Create Account</Text>
          <View>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              animating={loading}
            />
          </View>
          <TextInput
            style={styles.input}
            label="First name"
            onChangeText={setNewFirstName}
            value={newFirstName}
          />
          <TextInput
            style={styles.input}
            label="Last name"
            onChangeText={setNewLastName}
            value={newLastName}
          />
          <TextInput
            style={styles.input}
            label="Email"
            onChangeText={setCreateUserEmailAddress}
            value={createUserEmailAddress}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            label="Password"
            onChangeText={setCreateUserPassword}
            value={createUserPassword}
          />
          <Button
            style={styles.button}
            title="Create Account"
            onPress={createUser}
            mode="contained"
          >
            Create Account
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  smallHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});
