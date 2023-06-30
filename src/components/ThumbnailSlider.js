import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRef, useState } from "react";
import { Video } from "expo-av";
const ThumbnailSlider = ({ screenshots, trailers }) => {
  const [activeScreen, setActiveScreen] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const video = useRef(null);

  return (
    <View className="my-6">
      {activeVideo ? (
        <Video
          ref={video}
          source={{ uri: activeVideo.trailer || trailers[0].data.max }}
          className="mb-2 h-56 w-full"
          useNativeControls
          isLooping
          posterSource={{ uri: activeVideo.preview || trailers[0].preview }}
          resizeMode="contain"
          shouldPlay
        />
      ) : (
        <Image
          source={{ uri: activeScreen || screenshots[0]?.image }}
          className="mb-2 h-56 w-full"
          style={{ resizeMode: "contain" }}
        />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-2"
      >
        {trailers &&
          trailers.map((trailer) => (
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
        {screenshots &&
          screenshots.map((screenshot) => (
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
