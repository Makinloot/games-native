import { View, ScrollView } from "react-native";

const TagsSliderSkeleton = () => {
  const data = Array.from({ length: 10 });
  return (
    <View>
      <View className="mb-2 h-6 w-1/4 bg-red-200" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="h-16 w-full flex-row items-start gap-2">
          {data.map((item, i) => (
            <View className="h-8 w-24 bg-red-200" key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TagsSliderSkeleton;
