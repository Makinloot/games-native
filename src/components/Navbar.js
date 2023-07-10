import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const handleNavigation = (screen) => navigation.navigate(screen);
  return (
    <View className="h-16 w-full flex-row items-center justify-around bg-nightBlue">
      <TouchableOpacity onPress={() => handleNavigation("Home")}>
        <MaterialCommunityIcons name="home-variant" color="white" size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("Browse")}>
        <MaterialCommunityIcons name="magnify" color="white" size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("Profile")}>
        <Ionicons name="library" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
