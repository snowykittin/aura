import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MemberScreen from "./screens/MemberScreen";
import AddEntryScreen from "./screens/AddEntryScreen";
import EntryDetailScreen from "./screens/EntryDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="member"
            component={MemberScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="addEntry"
            component={AddEntryScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="entryDetail"
            component={EntryDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
