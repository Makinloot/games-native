import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import CardVerticalSkeleton from "./card/cardVertical/CardVerticalSkeleton";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Card from "./card/Card";

const PaginatedList = ({ api_url, list_name }) => {
  const scrollViewRef = useRef(null);
  const queryClient = useQueryClient();

  // navigation
  const navigation = useNavigation();
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  // fetch data
  const fetchPage = async ({ pageParam = 1 }) => {
    const url = `${api_url}&page=${pageParam}`;
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  // when scrollview reaches bottom return true
  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const containerHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;
    const scrollPosition = contentOffset.y;

    if (scrollPosition + containerHeight >= contentHeight - 100) {
      return true;
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
  } = useInfiniteQuery([list_name + "list"], fetchPage, {
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) return lastPage.next;
      return undefined;
    },
  });

  useEffect(() => {
    // clear cache of react-query
    return () => {
      queryClient.cancelQueries();
      queryClient.clear();
    };
  }, [api_url, list_name]);
  return data?.pages[0]?.results?.length <= 0 ? (
    <View className="h-screen max-h-80 items-center justify-center">
      <Text className="font-robotoBold text-lg text-white">
        no results match your search
      </Text>
    </View>
  ) : (
    <ScrollView
      ref={scrollViewRef}
      onScroll={(e) => handleScroll(e) && fetchNextPage()}
      scrollEventThrottle={300}
      showsVerticalScrollIndicator={false}
    >
      {data?.pages?.map((page, i) => (
        <View key={i}>
          {page?.results?.map((game, idx) => (
            <View key={game.id}>
              <TouchableOpacity
                key={idx}
                onPress={() => handleNavigation(game.id)}
              >
                <Card {...game} vertical />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}

      {/* if fetching display loading animation */}
      {(isFetching || isFetchingNextPage) &&
        Array.from({ length: 10 }).map((_, i) => (
          <CardVerticalSkeleton key={i} />
        ))}

      {/* if error display text */}
      {error && (
        <Text className="tex-white font-robotoBold text-lg">
          OOPS, something went wrong...
        </Text>
      )}

      {/* if no next page return no more results */}
      {!hasNextPage && data?.pages[0]?.results?.length >= 10 && (
        <View className="m-2 items-center justify-center">
          <Text className="font-robotoBold text-lg text-white">
            No more results !
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PaginatedList;
