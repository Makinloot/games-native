import { View, Text } from "react-native";
import DetailsText from "../DetailsText";

const GameRatings = ({ ratings, ratings_count }) => {
  return (
    <View>
      <Text className="mb-2 font-robotoBold text-xl uppercase text-[#8A97A0]">
        reviews
      </Text>
      <View className="bg-[#445586] p-1">
        <DetailsText
          title={`mostly ${ratings[0]?.title}`}
          customText={`total reviews ${ratings_count}`}
          titleColor="text-white"
          longTitle
        />
      </View>
    </View>
  );
};

export default GameRatings;
