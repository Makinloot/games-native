import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Card from "../card/Card";
import { useGet } from "../../utils/hooks/useGet";
import RowSkeleton from "./RowSkeleton";
import { useNavigation } from "@react-navigation/native";

const Row = ({ title, url, useMap }) => {
  const { navigate } = useNavigation();
  const { data, refetch, isLoading, isFetching } = useGet(url, title);
  const handleNavigation = (id, name) => navigate("Game", { id, name });
  // return list of Card using FlatList
  function renderFlatList(data) {
    return (
      <FlatList
        data={data?.results}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigation(item.id, item.name)}
          >
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
        onPress={() => handleNavigation(item.id, item.name)}
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
    <View className="">
      {title && (
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-robotoLight text-xl capitalize text-white">
            {title}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigate("List", {
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
