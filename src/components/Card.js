import { View, Text, Image } from "react-native";

const Card = ({ image, name, developer }) => {
  return (
    <View className="w-44 rounded-lg bg-black p-2">
      <Image
        source={{
          uri: "https://i1.sndcdn.com/artworks-jFu7FGQdLNe0e4kI-Za5REw-t240x240.jpg",
        }}
        className="h-40 w-full rounded-lg"
      />
      <Text className="my-1 font-robotoBold text-white" numberOfLines={2}>
        Assassin's creed creed creed creed creed creed creed
      </Text>
      <Text className="font-robotoBold text-white/50">Publisher</Text>
    </View>
  );
};

export default Card;
