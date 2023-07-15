import { View, Text, Image, TouchableOpacity } from "react-native";
import DetailsText from "../DetailsText";
import noImg from "../../../assets/no-img.png";
import { AntDesign } from "@expo/vector-icons";
import { useAppContext } from "../../utils/context/ContextProvider";
import { getLikedItems } from "../../utils/hooks/useDb";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    filterLikes(id);
  }, [likes]);

  return (
    <View>
      {/* game image and name */}
      <Image
        source={background_image ? { uri: background_image } : noImg}
        className="h-56 w-full"
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
      <Text
        className="my-4 font-robotoLight text-sm text-white"
        numberOfLines={10}
      >
        {description_raw}
      </Text>

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
