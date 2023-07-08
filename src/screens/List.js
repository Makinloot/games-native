import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import requests from "../utils/requests";
import Card from "../components/card/Card";
import CardVerticalSkeleton from "../components/card/cardVertical/CardVerticalSkeleton";

const List = ({ route, navigation }) => {
  const { name, slug } = route.params;
  const scrollViewRef = useRef(null);

  // navigation
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  // when scrollview reaches bottom return true
  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const containerHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;
    const scrollPosition = contentOffset.y;

    if (scrollPosition + containerHeight >= contentHeight - 20) {
      return true;
    }
  };

  // fetch data
  const fetchPage = async ({ pageParam = 1 }) => {
    const url = `${requests.genre}${slug}&page_size=10&page=${pageParam}`;
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  // use infinity query for pagination
  const {
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery([slug + "list"], fetchPage, {
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) return lastPage.next;
      return false;
    },
  });

  return (
    <View className="flex-1 bg-nightBlue p-2">
      <View className="my-2 flex-row">
        <Text className="font-robotoBold text-lg text-white">
          Filtered by
          <Text className="uppercase text-lightBlue"> {name}</Text>
        </Text>
      </View>
      <View className="mb-9 w-full">
        <ScrollView
          ref={scrollViewRef}
          onScroll={(e) => handleScroll(e) && fetchNextPage()}
          scrollEventThrottle={300}
        >
          {data?.pages?.map((page, i) => (
            <View key={i}>
              {page?.results?.map((game, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleNavigation(game.id)}
                  >
                    <Card {...game} vertical />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* if fetching display loading animation */}
          {(isFetching || isFetchingNextPage) &&
            Array.from({ length: 10 }).map((_) => <CardVerticalSkeleton />)}

          {/* if error display text */}
          {error && (
            <Text className="tex-white font-robotoBold text-lg">
              OOPS, something went wrong...
            </Text>
          )}

          {/* if no more data display text */}
          {!hasNextPage && (
            <Text className="font-robotoBold text-lg text-white">
              NO MORE DATA
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default List;
