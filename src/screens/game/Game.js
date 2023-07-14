import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useRef } from "react";
import { API_KEY } from "@env";
import { useGet } from "../../utils/hooks/useGet";
import Search from "../../components/search/Search";
import ThumbnailSlider from "../../components/ThumbnailSlider";
import GameAdditionalContent from "../../components/gameDetails/GameAdditionalContent";
import GameSkeleton from "./GameSkeleton";
import SameSeries from "../../components/gameDetails/SameSeries";
import GameRatings from "../../components/gameDetails/GameRatings";
import GameTags from "../../components/gameDetails/GameTags";
import GameDetails from "../../components/gameDetails/GameDetails";

const Game = ({ route, navigation }) => {
  const { id } = route.params;
  const scrollViewRef = useRef();

  const gameUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
  const {
    data: game,
    refetch,
    isLoading,
    isFetching,
  } = useGet(gameUrl, "game");

  const scrollToTop = () =>
    scrollViewRef?.current?.scrollTo({ y: 0, animated: true });
  const handleNavigation = (id) => navigation.navigate("Game", { id });

  useEffect(() => {
    refetch();
    scrollToTop();
  }, [id]);

  if (isLoading || isFetching) return <GameSkeleton />;
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

    return (
      <View className="flex-1 bg-nightBlue p-2 pb-0">
        <View>
          <Search navigation={navigation} />
        </View>
        <ScrollView
          ref={scrollViewRef}
          className="my-5 mb-0"
          showsVerticalScrollIndicator={false}
        >
          {/* game img, name, developers, publishers, released & description */}
          <GameDetails
            background_image={background_image}
            description_raw={description_raw}
            developers={developers}
            publishers={publishers}
            released={released}
            name={name}
          />

          {/* game tags */}
          {tags?.length > 1 && <GameTags tags={tags} />}

          {/* game ratings */}
          {ratings && (
            <GameRatings ratings={ratings} ratings_count={ratings_count} />
          )}

          {/* game screenshots */}
          <ThumbnailSlider id={id} />

          {/* game dlc packs */}
          <GameAdditionalContent id={id} />

          {/* games from same series */}
          <SameSeries id={id} handleNavigation={handleNavigation} />
        </ScrollView>
      </View>
    );
  }
};

export default Game;
