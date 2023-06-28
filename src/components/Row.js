import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Row = ({ title, url, limit, rowVertical, cardHorizontal }) => {
  const [data, setData] = useState([]);

  function fetchData(url) {
    axios
      .get(url)
      .then((res) => {
        if (limit) {
          setData(res.data.results.slice(0, limit));
        } else {
          setData(res.data.results);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData(url);
    console.log(data);
  }, []);

  return (
    <View className="my-8">
      {title && (
        <Text className="mb-4 font-robotoLight text-xl capitalize text-white">
          {title}
        </Text>
      )}
      <View>
        <FlatList
          data={data}
          renderItem={(game) => (
            <Card {...game.item} horizontal={cardHorizontal ? true : false} />
          )}
          keyExtractor={(game) => game.id}
          horizontal={rowVertical ? false : true}
          ItemSeparatorComponent={() => <View className="h-2 w-2" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Row;
