import { useState } from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { TextInput, Button, List } from "react-native-paper";

const image = { uri: "../assets/images/AdobeStock_314948242.jpeg" };

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/AdobeStock_314948242.jpeg")}
        resizeMode="cover"
        style={styles.imageBg}
      >
        <Image
          style={styles.bigLogo}
          source={require("../assets/images/AuraLogos/vertical-logo-transparent-png.png")}
          alt="Aura"
        />

        <View style={styles.btnRow}>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    backgroundColor: "#98473E",
  },
  bigLogo: {
    width: 250,
    height: 250,
    marginTop: 150,
  },
  btnRow: {
    flex: 1,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
