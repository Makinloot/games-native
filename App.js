import { StatusBar as ExpoBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import Home from "./src/screens/Home";
import Navbar from "./src/components/Navbar";
import Card from "./src/components/Card";

export default function App() {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    robotoLight: require("./assets/fonts/Roboto-Light.ttf"),
  });

  // Show a loading screen or return null
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Home />
      <Card />
      <Navbar />
      <ExpoBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
  },
});
