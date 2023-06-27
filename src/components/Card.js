import { View, Text, Image } from "react-native";

const Card = ({ background_image, name, rating }) => {
  console.log(background_image);
  return (
    <View className="relative w-44 rounded-lg bg-black p-2">
      <Image
        source={{
          uri: background_image,
        }}
        className="h-40 w-full rounded-lg"
      />
      <Text className="mb-3 mt-1 font-robotoBold text-white" numberOfLines={2}>
        {name}
      </Text>
      <Text className="absolute bottom-1 left-2 font-robotoBold text-white/50">
        Rating: {rating}
      </Text>
    </View>
  );
};

export default Card;
