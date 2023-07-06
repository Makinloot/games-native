import { View, ScrollView } from "react-native";
import Search from "../components/search/Search";
import Row from "../components/row/Row";

import requests from "../utils/requests";
import Genres from "../components/Genres";

const Browse = ({ navigation }) => {
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  return (
    <View className="p-2 pb-12">
      <View className="pb-2">
        <Search navigation={navigation} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative z-10"
      >
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
