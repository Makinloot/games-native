import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRef, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../components/card/Card";
import CardVerticalSkeleton from "../../components/card/cardVertical/CardVerticalSkeleton";

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

const List = ({ route, navigation }) => {
  const { list_url, filtered_by } = route.params;
  const scrollViewRef = useRef(null);
  const queryClient = useQueryClient();

  // navigation
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  // fetch data
  const fetchPage = async ({ pageParam = 1 }) => {
    const url = `${list_url}&page_size=10&page=${pageParam}`;
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
  } = useInfiniteQuery([filtered_by + "list"], fetchPage, {
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
  }, []);

  // TODO: ADD FUNCTIONALITY FOR LIST SCREEN TO FILTER GIVEN DATA IN VARIOUS WAYS
  return (
    <View className="flex-1 bg-nightBlue p-2">
      <View className="my-2 flex-row">
        <Text className="font-robotoBold text-lg text-white">
          Filtered by
          <Text className="uppercase text-lightBlue"> {filtered_by}</Text>
        </Text>
      </View>
      <View className="mb-9 w-full">
        {data?.pages[0]?.results?.length <= 0 ? (
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
          >
            {data?.pages?.map((page, i) => (
              <View key={i}>
                {page?.results?.map((game, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleNavigation(game.id)}
                  >
                    <Card {...game} vertical />
                  </TouchableOpacity>
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
            {!hasNextPage && (
              <View className="m-2 items-center justify-center">
                <Text className="font-robotoBold text-lg text-white">
                  No more results !
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default List;
