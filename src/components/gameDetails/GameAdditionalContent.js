import { View, Text } from "react-native";
import { useGet } from "../../utils/useGet";
import { useEffect } from "react";
import { API_KEY } from "@env";

const GameAdditionalContent = ({ id }) => {
  const url = `https://api.rawg.io/api/games/${id}/additions?key=${API_KEY}`;
  const { data, refetch } = useGet(url, "additions");

  useEffect(() => {
    refetch();
  }, [id]);

  if (data?.results?.length > 0) {
    return (
      <View>
        <Text className="my-2 font-robotoBold uppercase text-white">
          content for this game
        </Text>
        {data.results.map((item) => (
          <View className="mt-1 bg-[#3A434B] p-1" key={item.id}>
            <Text className="font-robotoLight text-white">{item.name}</Text>
          </View>
        ))}
      </View>
    );
  }
};

export default GameAdditionalContent;
