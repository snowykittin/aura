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
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [signInEmailAdderss, setSignInEmailAddress] = useState();
  const [signInPassword, setSignInPassword] = useState();
  const [loading, setLoading] = useState(false);

  const signInUser = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, signInEmailAdderss, signInPassword)
        .then((userCredential) => {
          console.log("User signed in");
          setSignInEmailAddress("");
          setSignInPassword("");

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to My Business</Text>
        <View>
          <Text style={styles.smallHeader}>Sign In</Text>
          <TextInput
            style={styles.input}
            label="Username"
            onChangeText={setSignInEmailAddress}
            value={signInEmailAdderss}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            label="Password"
            onChangeText={setSignInPassword}
            value={signInPassword}
          />
          <Button
            style={styles.button}
            title="Sign In"
            onPress={signInUser}
            mode="contained"
          >
            Sign In
          </Button>
        </View>
        <View>
          <ActivityIndicator size="large" color="#0000ff" animating={loading} />
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
