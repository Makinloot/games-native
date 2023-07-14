import { StatusBar as ExpoBar } from "expo-status-bar";
import { StatusBar, Platform, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ContextProvider } from "./src/utils/context/ContextProvider";
import Routes from "./src/components/Routes";

const queryClient = new QueryClient();
export default function App() {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    robotoLight: require("./assets/fonts/Roboto-Light.ttf"),
  });

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
            <Routes />
            <ExpoBar style="light" />
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </ContextProvider>
  );
}
