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
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          style={styles.horizontalLogo}
          source={require("../assets/images/AuraLogos2/horizontal-logo-transparent-png.png")}
          alt="Aura"
        />
        <Text style={styles.header}>Welcome Back!</Text>
        <View style={styles.loginForm}>
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
          <ActivityIndicator size="large" color="#A37C40" animating={loading} />
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
    alignItems: "center",
    height: "100%",
  },
  scrollContainer: {
    backgroundColor: "#B49082",
    flex: 1,
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
    justifyContent: "center",
    marginTop: 100,
  },
});
