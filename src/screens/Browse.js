import { View } from "react-native";
import Search from "../components/search/Search";
import Genres from "../components/Genres";

const Browse = ({ navigation }) => {
  return (
    <View className="relative flex-1 bg-nightBlue p-2">
      <View className="pb-2">
        <Search navigation={navigation} />
      </View>
      <Genres navigation={navigation} />
    </View>
  );
};

export default Browse;
