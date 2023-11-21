import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function MemberScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>MemberScreen</Text>
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
});
