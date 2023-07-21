import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import DetailsText from "../DetailsText";
import noImg from "../../../assets/no-img.png";
import { AntDesign } from "@expo/vector-icons";
import { useAppContext } from "../../utils/context/ContextProvider";
import { getLikedItems } from "../../utils/hooks/useDb";

const GameDetails = ({
  background_image,
  developers,
  publishers,
  description_raw,
  released,
  name,
  id,
}) => {
  const { likedItems, currentUser } = useAppContext();
  const likes = getLikedItems(currentUser.uid);
  const [isLiked, setIsLiked] = useState(false);
  const [descriptionSize, setDescriptionSize] = useState(10);
  const descriptionRef = useRef();

  // convert release date into more readable date
  const formattedDate = new Date(released).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // check if game is already liked
  const filterLikes = (id) => {
    const filterLikes = likes.includes(id);
    if (filterLikes) {
      setIsLiked(true);
      return;
    }
    setIsLiked(false);
  };

  // if description length is more than 700 characters show "show more" btn
  const fullDescription = () => {
    if (description_raw.length > 700) {
      return (
        <TouchableOpacity
          className="mt-1"
          onPress={() =>
            descriptionSize >= 10
              ? setDescriptionSize(0)
              : setDescriptionSize(10)
          }
        >
          <Text className="font-roboto text-white/40">
            {descriptionSize === 0 ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    filterLikes(id);
  }, [likes]);

  return (
    <View className="">
      {/* game image and name */}
      <Image
        source={background_image ? { uri: background_image } : noImg}
        style={{
          aspectRatio: 1.77778,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
      <Text className="my-3 font-robotoBold text-xl text-white">{name}</Text>

      {/* game developers & publishers */}
      {developers && <DetailsText data={developers} title="developer" />}
      {publishers && (
        <View className="my-1">
          <DetailsText data={publishers} title="publisher" />
        </View>
      )}
      <DetailsText title="released" customText={formattedDate} />

      {/* game description */}
      <View className="my-4">
        <Text
          className="font-robotoLight text-sm text-white"
          numberOfLines={descriptionSize}
          ref={descriptionRef}
        >
          {description_raw}
        </Text>
        {fullDescription()}
      </View>

      {/* like button */}
      <View className="mb-6">
        <TouchableOpacity onPress={() => likedItems(id)}>
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            color="white"
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameDetails;
