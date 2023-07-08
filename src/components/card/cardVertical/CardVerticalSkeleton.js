import { View } from "react-native";
import LinearGradientAnimation from "../../linearGradientAnimation/LinearGradientAnimation";
const CardVerticalSkeleton = () => {
  return (
    <View className="w-full flex-row bg-aquaBlue py-1">
      <LinearGradientAnimation styles="mr-1 h-20 w-1/3 bg-red-100" />
      <View className="w-full justify-between">
        <LinearGradientAnimation styles="h-4 w-1/2 bg-red-200" />
        <LinearGradientAnimation styles="h-4 w-1/4 bg-red-200" />
        <LinearGradientAnimation styles="h-4 w-1/6 bg-red-200" />
      </View>
    </View>
  );
};

export default CardVerticalSkeleton;
