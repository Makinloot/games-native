import { StatusBar as ExpoBar } from "expo-status-bar";
import { StatusBar, Platform, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import Home from "./src/screens/Home";
import Navbar from "./src/components/Navbar";
import Browse from "./src/screens/Browse";
import Game from "./src/screens/game/Game";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useContext } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import List from "./src/screens/list/List";
import Auth from "./src/components/auth/Auth";
import Login from "./src/screens/auth/login/Login";
import { ContextProvider } from "./src/utils/context/ContextProvider";
import Register from "./src/screens/auth/register/Register";
import ResetPsw from "./src/screens/auth/resetPsw/ResetPsw";
const queryClient = new QueryClient();
export default function App() {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    robotoLight: require("./assets/fonts/Roboto-Light.ttf"),
  });
  const [hideNavbar, setHideNavbar] = useState(false);

  const Stack = createNativeStackNavigator();
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  // Show a loading screen or return null
  if (!fontsLoaded) return null;
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={navigationTheme}>
          <SafeAreaView
            style={{
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
            className="relative flex-1 bg-nightBlue"
          >
            <Stack.Navigator>
              {/* <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Browse" component={Browse} />
              <Stack.Screen
                name="Game"
                component={Game}
                options={({ route }) => ({ title: `Game ${route.params.id}` })}
              />
              <Stack.Screen name="List" component={List} /> */}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ResetPsw" component={ResetPsw} />
            </Stack.Navigator>
            {/* <Home /> */}
            {/* <Browse /> */}
            {/* <Game id={3328} /> */}
            {/* {!hideNavbar && <Navbar />} */}
            <ExpoBar style="light" />
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </ContextProvider>
  );
}
