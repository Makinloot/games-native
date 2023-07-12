import { View, Text, Button, TouchableOpacity } from "react-native";
import { useAppContext } from "../utils/context/ContextProvider";

const Home = ({ navigation }) => {
  const handleNavigation = () => navigation.navigate("Browse");
  const { handleSignout, currentUser, saveUser } = useAppContext();

  return (
    <View className="relative flex-1">
      <Text className="m-5 text-white">Welcome back {currentUser?.email}</Text>
      <TouchableOpacity
        className="my-5 bg-blue-300 p-5"
        onPress={handleSignout}
      >
        <Text className="text-white">LOG OUT TEST BTN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="my-5 bg-blue-300 p-5"
        onPress={() => saveUser("lmao hjahahahah")}
      >
        <Text className="text-white">database TEST BTN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="my-5 bg-blue-300 p-5"
        onPress={() => navigation.navigate("Browse")}
      >
        <Text className="text-white">BROWSE</Text>
      </TouchableOpacity>
      {/* <View className="absolute bottom-0 w-full"> */}
      {/* </View> */}
    </View>
  );
};

export default Home;
