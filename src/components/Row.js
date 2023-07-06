import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Card from "./Card";
import { useGet } from "../utils/useGet";

const Row = ({ title, url, rowVertical, cardHorizontal, useMap, navigate }) => {
  const { data, refetch } = useGet(url, title);

  // return list of Card using FlatList
  function renderFlatList(data) {
    return (
      <FlatList
        data={data?.results}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigate && navigate(item.id)}>
            <Card {...item} horizontal={cardHorizontal ? true : false} />
          </TouchableOpacity>
        )}
        horizontal={rowVertical ? false : true}
        ItemSeparatorComponent={() => <View className="h-2 w-2" />}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  // return list of Card using map
  function renderListWithMap(data) {
    const list = data?.results?.map((item) => (
      <TouchableOpacity
        key={item.id}
        className="mt-2"
        onPress={() => navigate && navigate(item.id)}
      >
        <Card {...item} horizontal={cardHorizontal ? true : false} />
      </TouchableOpacity>
    ));
    return list;
  }

  useEffect(() => {
    refetch();
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
