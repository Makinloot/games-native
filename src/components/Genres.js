import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useGet } from "../utils/hooks/useGet";
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

  return (
    <View className="relative flex-1 bg-nightBlue p-1">
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
      <ScrollView className="">
        {/* row component based on genre */}
        <Row
          url={`${requests.genre}${activeGenre.slug}&page_size=10`}
          useMap
          navigate={handleNavigation}
        />

        {/* see more btn */}
        {!isLoading && (
          <TouchableOpacity
            className="my-2 bg-[#445586] p-2"
            onPress={() =>
              navigation.navigate("List", {
                list_url: `${requests.genre}${activeGenre.slug}&page_size=10`,
                filtered_by: activeGenre.name,
              })
            }
          >
            <Text className="text-center font-robotoLight text-sm text-white">
              see more{" "}
              <Text className="font-robotoBold">
                {activeGenre.name.toUpperCase()}
              </Text>{" "}
              games
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Genres;
