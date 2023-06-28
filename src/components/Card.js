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
      <View className="bg-gray-700 w-full flex-row py-1">
        <Image
          source={{
            uri: background_image,
          }}
          className="mr-1 h-20 w-1/3"
          style={{ resizeMode: "cover" }}
        />
        <View className="w-full justify-between">
          <Text
            className="text-white font-robotoBold text-base"
            numberOfLines={1}
          >
            {name}
          </Text>
          <View className="flex-row items-center gap-0.5">
            {/* <MaterialCommunityIcons name="sony-playstation" size={24} /> */}
            {filterGamePlatforms(platforms)}
          </View>
          <Text className="text-white font-robotoLight text-xs">
            {released.split("-").reverse().join(".")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="relative w-72 bg-[#292C35] pb-2">
      <Image
        source={{
          uri: background_image,
        }}
        className="h-64 w-full"
        style={{ resizeMode: "cover" }}
      />
      <View className="p-2">
        <Text
          className="text-white mb-3 mt-1 font-robotoBold text-xl"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="text-white/50 absolute bottom-0 left-2 font-robotoBold"
          numberOfLines={1}
        >
          {genres && genres.map((genre) => genre.name).join(", ")}
        </Text>
      </View>
    </View>
  );
};

export default Card;
