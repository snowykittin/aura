import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

export default function AddEntryScreen() {
  return (
    <View style={styles.container}>
      <Text>AddEntryScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
