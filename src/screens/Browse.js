import { View, Text, FlatList, ScrollView } from "react-native";
import Search from "../components/Search";
import Row from "../components/Row";

import requests from "../utils/requests";
import Genres from "../components/Genres";

const Browse = () => {
  return (
    <ScrollView className="p-2" showsVerticalScrollIndicator={false}>
      <Search />
      <View>
        <View>
          <Row title="best of the week" url={requests.weekly} />
        </View>
        <View>
          <Row title="popular upcoming" url={requests.upcoming} />
        </View>
      </View>
      <Genres />
    </ScrollView>
  );
};

export default Browse;
