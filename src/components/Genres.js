import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useGet } from "../utils/useGet";
import requests from "../utils/requests";
import Row from "./row/Row";
import TagsSlider from "./tagsSlider/TagsSlider";

const Genres = ({ navigation }) => {
  const {
    data: genres,
    refetch,
    isLoading,
  } = useGet(requests.genres, "genres");
  const [activeGenre, setActiveGenre] = useState({
    slug: "action",
    name: "Action",
  });

  const handleNavigation = (id) => navigation.navigate("Game", { id });

  useEffect(() => {
    refetch();
  }, []);

  // if (!isLoading) return <Text>LMAOO</Text>;
  return (
    <View className="relative my-4 bg-nightBlue p-1 pb-5">
      {/* list of genres */}
      <View>
        <TagsSlider
          data={genres?.results}
          isLoading={isLoading}
          clickable
          active={activeGenre}
          setActive={setActiveGenre}
        />
      </View>

      {/* row component based on genre */}
      <Row
        url={`${requests.genre}${activeGenre.slug}&page_size=10`}
        rowVertical
        cardHorizontal
        useMap
        navigate={handleNavigation}
      />

      {/* see more btn */}
      {isLoading && (
        <TouchableOpacity className="absolute bottom-0 left-1 bg-[#445586] p-2">
          <Text className="font-robotoLight text-sm text-white">
            see more{" "}
            <Text className="font-robotoBold">
              {activeGenre.name.toUpperCase()}
            </Text>{" "}
            games
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Genres;
