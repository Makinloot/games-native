import { View, ScrollView } from "react-native";
import Search from "../components/search/Search";
import Row from "../components/row/Row";

import requests from "../utils/requests";
import Genres from "../components/Genres";

const Browse = ({ navigation }) => {
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  return (
    <View className="relative bg-nightBlue p-2">
      <View className="pb-2">
        <Search navigation={navigation} />
      </View>
      <View className="relative h-full pb-24">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="absolute inset-0 h-full flex-grow"
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
          <View>
            <Row
              title="best of 2023"
              url={requests.yearlyUrl}
              navigate={handleNavigation}
            />
          </View>
          <Genres navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Browse;
