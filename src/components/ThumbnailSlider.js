import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import { useGet } from "../utils/hooks/useGet";
import { API_KEY } from "@env";

const ThumbnailSlider = ({ id }) => {
  const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`;
  const trailersUrl = `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`;
  const {
    data: screenshotsData,
    isLoading: screenshotsIsLoading,
    refetch: screenshotsRefetch,
  } = useGet(screenshotsUrl, "screenshots");
  const {
    data: trailersData,
    isLoading: strailersIsLoading,
    refetch: trailersRefetch,
  } = useGet(trailersUrl, "trailers");

  const [activeScreen, setActiveScreen] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const video = useRef(null);

  useEffect(() => {
    screenshotsRefetch();
    trailersRefetch();
  }, [id]);

  return (
    <View className="my-6">
      {activeVideo ? (
        <Video
          ref={video}
          source={{
            uri: activeVideo.trailer || trailersData?.results[0]?.data.max,
          }}
          className="mb-2 h-56 w-full"
          useNativeControls
          isLooping
          posterSource={{
            uri: activeVideo.preview || trailersData?.results[0]?.preview,
          }}
          resizeMode="contain"
          shouldPlay
        />
      ) : (
        <Image
          source={{ uri: activeScreen || screenshotsData?.results[0]?.image }}
          className="mb-2 h-56 w-full"
          style={{ resizeMode: "contain" }}
        />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-2"
      >
        {trailersData?.results?.map((trailer) => (
          <TouchableOpacity
            key={trailer.id}
            onPress={() =>
              setActiveVideo({
                trailer: trailer.data.max,
                preview: trailer.preview,
              })
            }
          >
            <Image source={{ uri: trailer.preview }} className="h-20 w-36" />
          </TouchableOpacity>
        ))}
        {screenshotsData?.results?.map((screenshot) => (
          <TouchableOpacity
            onPress={() => {
              setActiveScreen(screenshot.image);
              setActiveVideo(null);
            }}
            key={screenshot.id}
          >
            <Image source={{ uri: screenshot.image }} className="h-20 w-36" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ThumbnailSlider;
