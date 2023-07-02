import { View, Text, FlatList, ScrollView } from "react-native";
import Search from "../components/Search";
import Row from "../components/Row";

import requests from "../utils/requests";
import Genres from "../components/Genres";

const Browse = ({ navigation }) => {
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  return (
    <View className="p-2 pb-12">
      <View className="pb-2">
        <Search />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Row
            title="best of the week"
            url={requests.weekly}
            navigate={handleNavigation}
          />
        </View>
        <View>
          <Row
            title="popular upcoming"
            url={requests.upcoming}
            navigate={handleNavigation}
          />
        </View>
        <Genres navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Browse;
