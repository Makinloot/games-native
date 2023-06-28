import { View, Text, Image } from "react-native";
import filterGamePlatforms from "../utils/platforms";

const Card = ({
  background_image,
  name,
  genres,
  horizontal,
  released,
  platforms,
}) => {
  if (horizontal) {
    return (
      <View className="w-full flex-row bg-aquaBlue py-1">
        <Image
          source={{
            uri: background_image,
          }}
          className="mr-1 h-20 w-1/3"
          style={{ resizeMode: "cover" }}
        />
        <View className="w-full justify-between">
          <Text
            className="font-robotoBold text-base text-white"
            numberOfLines={1}
          >
            {name}
          </Text>
          <View className="flex-row gap-1">
            {filterGamePlatforms(platforms)}
          </View>
          <Text className="font-robotoLight text-xs text-white">
            {released.split("-").reverse().join(".")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="relative w-72 bg-aquaBlue pb-2">
      <Image
        source={{
          uri: background_image,
        }}
        className="h-64 w-full"
        style={{ resizeMode: "cover" }}
      />
      <View className="p-2">
        <Text
          className="mb-3 mt-1 font-robotoBold text-xl text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="absolute bottom-0 left-2 font-robotoBold text-white/50"
          numberOfLines={1}
        >
          {genres && genres.map((genre) => genre.name).join(", ")}
        </Text>
      </View>
    </View>
  );
};

export default Card;
