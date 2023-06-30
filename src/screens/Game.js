import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Search from "../components/Search";
import requests from "../utils/requests";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "@env";
import noImg from "../../assets/no-img.png";
import DetailsText from "../components/DetailsText";
import ThumbnailSlider from "../components/ThumbnailSlider";
import GameAdditionalContent from "../components/GameAdditionalContent";

const Game = ({ id }) => {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [additions, setAdditions] = useState([]);
  const [trailers, setTrailers] = useState([]);

  // fetch game data
  function fetchGame() {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then(({ data }) => setGame(data))
      .catch((err) => console.log(err));
  }
  function fetchGameScreenshots() {
    axios
      .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
      .then(({ data }) => setScreenshots(data.results))
      .catch((err) => console.log(err));
  }
  function fetchGameAdditions() {
    axios
      .get(`https://api.rawg.io/api/games/${id}/additions?key=${API_KEY}`)
      .then(({ data }) => setAdditions(data.results))
      .catch((err) => console.log(err));
  }
  function fetchGameTrailers() {
    axios
      .get(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
      .then(({ data }) => setTrailers(data.results))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchGame();
    fetchGameScreenshots();
    fetchGameAdditions();
    fetchGameTrailers();
    // console.log(game);
    // console.log(screenshots);
    // console.log(additions);
    // console.log(trailers);
  }, [id]);

  if (game) {
    const {
      background_image,
      name,
      developers,
      publishers,
      released,
      description_raw,
      tags,
      ratings,
      ratings_count,
    } = game;

    // convert release date into more readable date
    const formattedDate = new Date(released).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return (
      <View className="flex-1 p-2">
        <Search />
        <ScrollView className="my-5" showsVerticalScrollIndicator={false}>
          <Image
            source={background_image ? { uri: background_image } : noImg}
            className="h-56 w-full"
          />
          <Text className="my-3 font-robotoBold text-xl text-white">
            {name}
          </Text>
          {developers && <DetailsText data={developers} title="developer" />}
          {publishers && (
            <View className="my-1">
              <DetailsText data={publishers} title="publisher" />
            </View>
          )}
          <DetailsText title="released" customText={formattedDate} />
          <Text
            className="my-6 font-robotoLight text-sm text-white"
            numberOfLines={10}
          >
            {description_raw}
          </Text>
          {tags && (
            <View>
              <Text className="mb-2 font-robotoBold text-xl uppercase text-[#8A97A0]">
                tags
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="h-16 flex-row items-start gap-2">
                  {tags.map((genre) => (
                    <Text
                      key={genre.id}
                      className={`bg-[#445586] p-1 font-robotoBold text-base text-white`}
                    >
                      {genre.name}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
          {ratings && (
            <View>
              <Text className="mb-2 font-robotoBold text-xl uppercase text-[#8A97A0]">
                reviews
              </Text>
              <View className="bg-[#445586] p-1">
                <DetailsText
                  title={`mostly ${ratings[0].title}`}
                  customText={`total reviews ${ratings_count}`}
                  titleColor="text-white"
                  longTitle
                />
              </View>
            </View>
          )}
          <ThumbnailSlider screenshots={screenshots} trailers={trailers} />
          {additions && <GameAdditionalContent data={additions} />}
        </ScrollView>
      </View>
    );
  }

  // TODO: return loading screen & error
  return null;
};

// delete later
Game.defaultProps = {
  id: 12447,
};

export default Game;
