import { View, Text, FlatList, ScrollView } from "react-native";
import Search from "../components/Search";
import Row from "../components/Row";

import requests from "../requests";

const Browse = () => {
  return (
    <View className="p-2">
      <Search />
      <ScrollView className="mb-20 mt-6" showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Row title="best of the week" url={requests.weekly} />
          </View>
          <View>
            <Row title="popular upcoming" url={requests.upcoming} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Browse;
