import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Row = ({ title, url, limit, rowVertical, cardHorizontal, useMap }) => {
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

  // return list of Card using FlatList
  function renderFlatList(data) {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card {...item} horizontal={cardHorizontal ? true : false} />
        )}
        horizontal={rowVertical ? false : true}
        ItemSeparatorComponent={() => <View className="h-2 w-2" />}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  // return list of Card using map
  function renderListWithMap(data) {
    const list = data.map((item) => (
      <View key={item.id} className="mt-2">
        <Card {...item} horizontal={cardHorizontal ? true : false} />
      </View>
    ));
    return list;
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <View className="my-8">
      {title && (
        <Text className="mb-4 font-robotoLight text-xl capitalize text-white">
          {title}
        </Text>
      )}
      <View>{useMap ? renderListWithMap(data) : renderFlatList(data)}</View>
    </View>
  );
};

export default Row;
