import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { API_KEY } from "@env";
import { useEffect } from "react";
import { useGet } from "../../utils/useGet";

const SameSeries = ({ id, handleNavigation }) => {
  const url = `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}&page_size=10`;
  const { data, refetch } = useGet(url, "sameSeries");

  useEffect(() => {
    refetch();
  }, [id]);

  if (data) {
    return (
      <View>
        <Text className="my-2 mt-4 font-robotoBold uppercase text-white">
          games from same series
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.results?.map((item, i) => (
            <TouchableOpacity
              onPress={() => handleNavigation(item.id)}
              className={i !== 0 && `ml-2`}
              key={item.id}
            >
              <Image
                source={{ uri: item.background_image }}
                className="h-20 w-36"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
};

export default SameSeries;