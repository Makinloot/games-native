import { View, Text, Image } from "react-native";
import DetailsText from "../DetailsText";
import noImg from "../../../assets/no-img.png";

const GameDetails = ({
  background_image,
  developers,
  publishers,
  description_raw,
  released,
  name,
}) => {
  // convert release date into more readable date
  const formattedDate = new Date(released).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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
        className="my-6 font-robotoLight text-sm text-white"
        numberOfLines={10}
      >
        {description_raw}
      </Text>
    </View>
  );
};

export default GameDetails;
