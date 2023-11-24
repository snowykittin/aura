import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [createUserEmailAddress, setCreateUserEmailAddress] = useState();
  const [createUserPassword, setCreateUserPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const signInUser = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        createUserEmailAddress,
        createUserPassword
      )
        .then((userCredential) => {
          setErrorText("");
          console.log("User signed in");

          setLoading(false);
          updateUserInformation();
          navigation.navigate("member");
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error ", error.message);
          setErrorText(error.message);
        });
    } catch (error) {
      console.log("Try error ", error.message);
      errorText = error.message;
      setLoading(false);
    }
  };

  const updateUserInformation = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: `${newFirstName}` + " " + `${newLastName}`,
        email: createUserEmailAddress,
      })
        .then(() => {
          console.log("Updated.");
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error ", error.message);
          setErrorText(error.message);
        });
    } catch (error) {
      console.log("Try error ", error.message);
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
          setErrorText("");
          console.log("User created");
          setNewFirstName("");
          setNewLastName("");
          setCreateUserEmailAddress("");
          setCreateUserPassword("");

          signInUser();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error ", error.message);
          setErrorText(error.message);
        });
    } catch (error) {
      console.log("Try error ", error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.horizontalLogo}
          source={require("../assets/images/AuraLogos2/horizontal-logo-transparent-png.png")}
          alt="Aura"
        />
        <Text style={styles.header}>Welcome to Aura!</Text>
        <View style={styles.loginForm}>
          <View>
            <ActivityIndicator
              size="large"
              color="#A37C40"
              animating={loading}
            />
          </View>
          <Text>{errorText}</Text>
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
    backgroundColor: "#B49082",
    padding: 20,
    minHeight: 700,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  horizontalLogo: {
    width: 250,
    height: 50,
  },
  input: {
    marginTop: 10,
    width: 300,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#98473E",
  },
  loginForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
