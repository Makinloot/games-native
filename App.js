import { StatusBar as ExpoBar } from "expo-status-bar";
import {
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import Home from "./src/screens/Home";
import Navbar from "./src/components/Navbar";
import Browse from "./src/screens/Browse";

export default function App() {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    robotoLight: require("./assets/fonts/Roboto-Light.ttf"),
  });

  // Show a loading screen or return null
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className="relative flex-1 bg-nightBlue"
    >
      {/* <Home /> */}
      <Browse />
      <Navbar />
      <ExpoBar style="light" />
    </SafeAreaView>
  );
}
