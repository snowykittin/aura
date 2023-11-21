import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

export default function MemberScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>MemberScreen</Text>
      <Button
        style={styles.button}
        title="Return Home"
        onPress={() => {
          navigation.navigate("home");
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
  },
});
