import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { API_KEY } from "@env";
import { useEffect } from "react";
import { useGet } from "../../utils/hooks/useGet";
import { useWindowDimensions } from "react-native";

const SameSeries = ({ id, handleNavigation }) => {
  const url = `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}&page_size=10`;
  const { data, refetch } = useGet(url, "sameSeries");
  const { width } = useWindowDimensions();

  useEffect(() => {
    refetch();
  }, [id]);

  if (data?.results?.length > 0) {
    return (
      <View>
        <Text className="my-2 mt-4 font-robotoBold uppercase text-white">
          games from same series
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.results.map((item, i) => (
            <TouchableOpacity
              onPress={() => handleNavigation(item.id, item.name)}
              className={i !== 0 && `ml-2`}
              key={item.id}
            >
              <Image
                source={{ uri: item.background_image }}
                className={`${width <= 480 ? "h-20 w-36" : "h-32 w-48"}`}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
};

export default SameSeries;
