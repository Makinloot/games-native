import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Search from "../components/search/Search";
import requests from "../utils/requests";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_KEY } from "@env";
import noImg from "../../assets/no-img.png";
import DetailsText from "../components/DetailsText";
import ThumbnailSlider from "../components/ThumbnailSlider";
import GameAdditionalContent from "../components/GameAdditionalContent";

const Game = ({ route, navigation }) => {
  const { id } = route.params;
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [additions, setAdditions] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [sameSeries, setSameSeries] = useState([]);
  const scrollViewRef = useRef();

  const handleNavigation = (id) => navigation.navigate("Game", { id });
  // fetch game data
  function fetchGame() {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then(({ data }) => setGame(data))
      .catch((err) => console.log(err));
  }
  // TODO: write useFetch function to minimize code
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
  function gameGameFromSameSeries() {
    axios
      .get(
        `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}&page_size=10`
      )
      .then(({ data }) => setSameSeries(data.results))
      .catch((err) => console.log(err));
  }
  function similarGames() {
    axios
      .get(
        `https://api.rawg.io/api/games/${id}/suggested&page_size=10?key=${API_KEY}`
      )
      .then(({ data }) => console.log("similar", data))
      .catch((err) => console.log(err));
  }

  const scrollToTop = () =>
    scrollViewRef?.current?.scrollTo({ y: 0, animated: true });

  useEffect(() => {
    scrollToTop();
    fetchGame();
    fetchGameScreenshots();
    fetchGameAdditions();
    fetchGameTrailers();
    gameGameFromSameSeries();
    similarGames();
    // console.log(game);
    // console.log(screenshots);
    // console.log(additions);
    // console.log(trailers);
    // console.log(sameSeries);
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
        <View>
          <Search navigation={navigation} />
        </View>
        <ScrollView
          ref={scrollViewRef}
          className="my-5"
          showsVerticalScrollIndicator={false}
        >
          {/* game image and name */}
          <Image
            source={background_image ? { uri: background_image } : noImg}
            className="h-56 w-full"
          />
          <Text className="my-3 font-robotoBold text-xl text-white">
            {name}
          </Text>

          {/* game developers & publishers */}
          {developers && <DetailsText data={developers} title="developer" />}
          {publishers && (
            <View className="my-1">
              <DetailsText data={publishers} title="publisher" />
            </View>
          )}
          <DetailsText title="released" customText={formattedDate} />

          {/* game description */}
          <Text
            className="my-6 font-robotoLight text-sm text-white"
            numberOfLines={10}
          >
            {description_raw}
          </Text>

          {/* game tags */}
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

          {/* game ratings */}
          {ratings && (
            <View>
              <Text className="mb-2 font-robotoBold text-xl uppercase text-[#8A97A0]">
                reviews
              </Text>
              <View className="bg-[#445586] p-1">
                <DetailsText
                  title={`mostly ${ratings[0]?.title}`}
                  customText={`total reviews ${ratings_count}`}
                  titleColor="text-white"
                  longTitle
                />
              </View>
            </View>
          )}

          {/* game screenshots */}
          <ThumbnailSlider screenshots={screenshots} trailers={trailers} />

          {/* game dlc packs */}
          {additions.length > 0 && <GameAdditionalContent data={additions} />}

          {/* games from same series */}
          {sameSeries.length > 0 && (
            <View>
              <Text className="my-2 mt-4 font-robotoBold uppercase text-white">
                games from same series
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sameSeries.map((item, i) => (
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
          )}
        </ScrollView>
      </View>
    );
  }

  // TODO: return loading screen & error
  return null;
};

export default Game;
