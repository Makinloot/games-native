import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import requests from "../utils/requests";
import Row from "./Row";

const Genres = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState({
    slug: "action",
    name: "Action",
  });

  const handleNavigation = (id) => navigation.navigate("Game", { id });

  // fetch avaliable genres
  function fetchGenres() {
    axios
      .get(requests.genres)
      .then((data) => setGenres(data.data.results))
      .catch((err) => console.log(err));
  }

  // return row based on genre
  function fetchGamesByGenre(url) {
    return (
      <Row
        url={url}
        limit={10}
        rowVertical
        cardHorizontal
        useMap
        navigate={handleNavigation}
      />
    );
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <View className="relative my-4 bg-nightBlue p-1 pb-5">
      {/* list of genres */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="h-16 flex-row items-start gap-2">
          {genres &&
            genres.map((genre) => {
              return (
                <TouchableOpacity
                  key={genre.id}
                  onPress={() =>
                    setActiveGenre({
                      slug: genre.slug,
                      name: genre.name,
                    })
                  }
                  activeOpacity={0.1}
                >
                  <Text
                    key={genre.id}
                    className={`p-1 font-robotoBold text-base text-white ${
                      genre.name === activeGenre.name
                        ? `border-b border-b-slate-300 bg-nightBlue`
                        : `bg-[#445586]`
                    }`}
                  >
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      {/* row component based on genre */}
      {fetchGamesByGenre(`${requests.genre}${activeGenre.slug}`)}

      {/* see more btn */}
      <TouchableOpacity className="absolute bottom-0 left-1 bg-[#445586] p-2">
        <Text className="font-robotoLight text-sm text-white">
          see more{" "}
          <Text className="font-robotoBold">
            {activeGenre.name.toUpperCase()}
          </Text>{" "}
          games
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Genres;
