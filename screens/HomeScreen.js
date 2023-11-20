import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        style={styles.button}
        title="Create Account"
        onPress={() => {
          navigation.navigate("login");
        }}
        mode="contained"
      >
        Sign In
      </Button>
      <Button
        style={styles.button}
        title="Create Account"
        onPress={() => {
          navigation.navigate("register");
        }}
        mode="contained"
      >
        Create Account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});
