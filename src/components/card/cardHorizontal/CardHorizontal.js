import { View, Text, Image } from "react-native";
import noImg from "../../../../assets/no-img.png";

const CardHorizontal = ({ background_image, name, genres }) => {
  return (
    <View className="relative w-72 bg-aquaBlue pb-2">
      <Image
        source={
          background_image
            ? {
                uri: background_image,
              }
            : noImg
        }
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

export default CardHorizontal;
