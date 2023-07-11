import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const handleNavigation = (screen) => navigation.navigate(screen);
  return (
    <View className="absolute bottom-0 left-2 z-50 h-[10vh] w-full flex-row items-center justify-around bg-nightBlue">
      <TouchableOpacity
        className="h-full flex-1 items-center justify-center"
        onPress={() => handleNavigation("Home")}
      >
        <MaterialCommunityIcons name="home-variant" color="white" size={28} />
      </TouchableOpacity>
      <TouchableOpacity
        className="h-full flex-1 items-center justify-center"
        onPress={() => handleNavigation("Browse")}
      >
        <MaterialCommunityIcons name="magnify" color="white" size={28} />
      </TouchableOpacity>
      <TouchableOpacity
        className="h-full flex-1 items-center justify-center"
        onPress={() => handleNavigation("Profile")}
      >
        <Ionicons name="library" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
