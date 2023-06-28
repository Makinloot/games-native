import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View className="h-16 w-full flex-row items-center justify-around bg-nightBlue">
      <MaterialCommunityIcons name="home-variant" color="white" size={28} />
      <MaterialCommunityIcons name="magnify" color="white" size={28} />
    </View>
  );
};

export default Navbar;
