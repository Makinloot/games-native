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
import { useGet } from "../utils/useGet";

const Game = ({ route, navigation }) => {
  const { id } = route.params;
  const scrollViewRef = useRef();

  const gameUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
  const sameSeriesUrl = `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}&page_size=10`;
  const gameAdditionsUrl = `https://api.rawg.io/api/games/${id}/additions?key=${API_KEY}`;
  const { data: game, refetch } = useGet(gameUrl, "game");
  const { data: sameSeries, refetch: sameSeriesRefetch } = useGet(
    sameSeriesUrl,
    "sameSeries"
  );
  const { data: additions, refetch: additionsRefetch } = useGet(
    gameAdditionsUrl,
    "additions"
  );

  const scrollToTop = () =>
    scrollViewRef?.current?.scrollTo({ y: 0, animated: true });
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  useEffect(() => {
    refetch();
    sameSeriesRefetch();
    additionsRefetch();
    scrollToTop();
    // console.log(additions);
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
          <ThumbnailSlider id={id} />

          {/* game dlc packs */}
          {additions?.results?.length > 0 && (
            <GameAdditionalContent data={additions.results} />
          )}

          {/* games from same series */}
          {sameSeries?.results?.length > 0 && (
            <View>
              <Text className="my-2 mt-4 font-robotoBold uppercase text-white">
                games from same series
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sameSeries.results.map((item, i) => (
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
