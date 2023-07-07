import { View, ScrollView } from "react-native";
import LinearGradientAnimation from "../linearGradientAnimation/LinearGradientAnimation";

const TagsSliderSkeleton = () => {
  const data = Array.from({ length: 10 });
  return (
    <View>
      <LinearGradientAnimation styles="mb-2 h-6 w-1/4" />

      <View>
        <View className="h-16 w-full flex-row items-start">
          {data.map((item, i) => (
            <LinearGradientAnimation
              styles={`h-8 w-24 ${i !== 0 && `ml-4`}`}
              key={i}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default TagsSliderSkeleton;
