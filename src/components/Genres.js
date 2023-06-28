import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import requests from "../utils/requests";
import Card from "./Card";
import Row from "./Row";
import { API_KEY } from "@env";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [gamesByGenre, setGamesByGenre] = useState([]);

  function fetchGenres() {
    axios
      .get(requests.genres)
      .then((data) => setGenres(data.data.results))
      .catch((err) => console.log(err));
  }

  // function fetchByGenre(url) {
  //   axios
  //     .get(url)
  //     .then((data) => setGamesByGenre(data.data.results.slice(0, 10)))
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    fetchGenres();
    // fetchByGenre(requests.genre + "indie");

    fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const test = data.results.map((result) => result.slug);
        console.log("DATA", test);
      });
  }, []);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="h-16 flex-row items-start gap-2">
          {genres &&
            genres.map((genre) => (
              <Text
                key={genre.id}
                className="text-white bg-[#445586] p-1 font-robotoBold text-base"
              >
                {genre.name}
              </Text>
            ))}
        </View>
      </ScrollView>

      {/* <View>
        <Row url={`${requests.genre}indie`} limit={10} cardHorizontal />
      </View> */}
      <Row
        url={`${requests.genre}indie`}
        limit={10}
        rowVertical
        cardHorizontal
      />
    </View>
  );
};

export default Genres;
