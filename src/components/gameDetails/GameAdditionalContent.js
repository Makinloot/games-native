import { View, Text, TouchableOpacity } from "react-native";
import { useGet } from "../../utils/hooks/useGet";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";

const GameAdditionalContent = ({ id }) => {
  const { navigate } = useNavigation();
  const url = `https://api.rawg.io/api/games/${id}/additions?key=${API_KEY}`;
  const { data, refetch } = useGet(url, "additions");
  const [additionalContentLimit, setAdditionalContentLimit] = useState(4);

  // show more or less additional content
  const handleContentLimit = () => {
    if (additionalContentLimit <= 4) setAdditionalContentLimit(1000);
    else setAdditionalContentLimit(4);
  };

  const handleNavigation = (id) => navigate("Game", { id });

  useEffect(() => {
    refetch();
  }, [id]);

  if (data?.results?.length > 0) {
    return (
      <View>
        <Text className="my-2 font-robotoBold uppercase text-white">
          content for this game
        </Text>
        {data.results
          .map((item) => (
            <TouchableOpacity
              className="mt-1 bg-[#3A434B] p-1"
              key={item.id}
              onPress={() => handleNavigation(item.id)}
            >
              <Text className="font-robotoLight text-white">{item.name}</Text>
            </TouchableOpacity>
          ))
          .slice(0, additionalContentLimit)}
        {data.results.length > 4 && (
          <TouchableOpacity
            className="mt-2 w-36 items-center justify-center bg-lightBlue p-1"
            onPress={handleContentLimit}
          >
            <Text className="font-roboto text-base text-white">
              {additionalContentLimit === 4 ? "Show more" : "Show less"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

export default GameAdditionalContent;
