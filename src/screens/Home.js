import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  const handleNavigation = navigation.navigate("Browse");
  return (
    <View>
      <Text className="text-lg text-red-200">Home</Text>
      {/* <Button title="navigate to browse" /> */}
    </View>
  );
};

export default Home;
