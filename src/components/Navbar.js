import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View className="absolute bottom-0 w-full flex-row justify-around border bg-black px-1 py-2">
      <MaterialCommunityIcons name="home-variant" color="white" size={28} />
      <MaterialCommunityIcons name="magnify" color="white" size={28} />
    </View>
  );
};

export default Navbar;
