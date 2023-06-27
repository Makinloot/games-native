import { StatusBar as ExpoBar } from "expo-status-bar";
import {
  StyleSheet,
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
import Card from "./src/components/Card";
import { API_KEY } from "@env";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [test, setTest] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((res) => setTest(res.data.results));
  }, []);

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

      <View>
        <FlatList
          data={test}
          renderItem={(game) => <Card {...game.item} />}
          keyExtractor={(game) => game.id}
          horizontal
          ItemSeparatorComponent={() => <View className="w-2" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

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
