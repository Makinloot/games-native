import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Row = ({ title, url }) => {
  const [data, setData] = useState([]);

  async function fetchData(url) {
    axios
      .get(url)
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData(url);
  }, []);

  return (
    <View className="my-8">
      {title && (
        <Text className="mb-4 text-xl capitalize text-white">{title}</Text>
      )}
      <View>
        <FlatList
          data={data}
          renderItem={(game) => <Card {...game.item} />}
          keyExtractor={(game) => game.id}
          horizontal
          ItemSeparatorComponent={() => <View className="w-2" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Row;
