import { View } from "react-native";
import LinearGradientAnimation from "../../linearGradientAnimation/LinearGradientAnimation";
import { useWindowDimensions } from "react-native";
const CardVerticalSkeleton = () => {
  const { width } = useWindowDimensions();
  return (
    <View className="w-full flex-row bg-aquaBlue py-1">
      <LinearGradientAnimation
        styles={`mr-1 ${
          width <= 480 ? "h-24 w-[150px]" : "h-32 w-[250px]"
        } bg-red-100`}
      />
      <View className="w-full justify-between">
        <LinearGradientAnimation styles="h-4 w-1/2 bg-red-200" />
        <LinearGradientAnimation styles="h-4 w-1/4 bg-red-200" />
        <LinearGradientAnimation styles="h-4 w-1/6 bg-red-200" />
      </View>
    </View>
  );
};

export default CardVerticalSkeleton;
