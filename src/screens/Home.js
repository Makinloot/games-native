import { View, Text, Button, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
  const handleNavigation = navigation.navigate("Browse");
  return (
    <View>
      <Text className="text-lg text-red-200">Home</Text>
      <TouchableOpacity onPress={handleNavigation}>
        <Text className="text-white">navigate</Text>
      </TouchableOpacity>
      {/* <Button title="navigate to browse" /> */}
    </View>
  );
};

export default Home;
