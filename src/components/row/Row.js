import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Card from "../card/Card";
import { useGet } from "../../utils/useGet";
import RowSkeleton from "./RowSkeleton";
import { useNavigation } from "@react-navigation/native";

const Row = ({ title, url, useMap, navigate }) => {
  const navigation = useNavigation();
  const { data, refetch, isLoading, isFetching } = useGet(url, title);
  // return list of Card using FlatList
  function renderFlatList(data) {
    return (
      <FlatList
        data={data?.results}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigate && navigate(item.id)}>
            <Card {...item} />
          </TouchableOpacity>
        )}
        horizontal
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
        <Card {...item} vertical />
      </TouchableOpacity>
    ));
    return list;
  }

  useEffect(() => {
    refetch();
  }, [url]);

  if (isLoading || isFetching) {
    if (useMap) return <RowSkeleton useMap />;
    else return <RowSkeleton />;
  }
  return (
    <View className="my-8">
      {title && (
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-robotoLight text-xl capitalize text-white">
            {title}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("List", {
                list_url: url,
                filtered_by: title,
              })
            }
          >
            <Text className="text-roboto mr-2 capitalize text-white/50">
              see more
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View>{useMap ? renderListWithMap(data) : renderFlatList(data)}</View>
    </View>
  );
};

export default Row;
