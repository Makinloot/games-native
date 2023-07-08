import { View } from "react-native";
import LinearGradientAnimation from "../../linearGradientAnimation/LinearGradientAnimation";
const CardHorizontalSkeleton = () => {
  return (
    <View className="relative w-72 bg-aquaBlue pb-2">
      <LinearGradientAnimation styles="h-64 w-max" />
      <View className="p-2">
        <LinearGradientAnimation styles="mb-3 mt-1 h-4 w-full" />
        <LinearGradientAnimation styles="absolute bottom-0 left-2 h-4 w-1/2" />
      </View>
    </View>
  );
};

export default CardHorizontalSkeleton;
