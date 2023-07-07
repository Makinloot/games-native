import { View, Text, ScrollView } from "react-native";

const GameTags = ({ tags }) => {
  return (
    <View>
      <Text className="mb-2 font-robotoBold text-xl uppercase text-[#8A97A0]">
        tags
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="h-16 flex-row items-start gap-2">
          {tags.map((genre) => (
            <Text
              key={genre.id}
              className={`bg-[#445586] p-1 font-robotoBold text-base text-white`}
            >
              {genre.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default GameTags;
