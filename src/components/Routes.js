import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../utils/context/ContextProvider";
import { useNavigation } from "@react-navigation/native";
// components
import Login from "../screens/auth/login/Login";
import Register from "../screens/auth/register/Register";
import ResetPsw from "../screens/auth/resetPsw/ResetPsw";
import Home from "../screens/Home";
import Browse from "../screens/Browse";
import Game from "../screens/game/Game";
import List from "../screens/list/List";
import Navbar from "./Navbar";
import Library from "../screens/Library";
import Account from "../screens/Account";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const { currentUser } = useAppContext();

  useEffect(() => {
    // if user not avaliable navigate to login page
    if (!currentUser) navigation.navigate("Login");
  }, [currentUser]);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen
          name="Game"
          component={Game}
          options={({ route }) => ({ title: `Game ${route.params.id}` })}
        />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPsw" component={ResetPsw} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
      {currentUser && <Navbar />}
    </>
  );
};

export default Routes;
