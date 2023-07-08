import { View, Text } from "react-native";
import Search from "../../components/search/Search";
import LinearGradientAnimation from "../../components/linearGradientAnimation/LinearGradientAnimation";
const GameSkeleton = () => {
  return (
    <View className="flex-1 bg-nightBlue p-2">
      <View>
        <Search />
      </View>
      <View className="my-5">
        {/* game image and name */}
        <LinearGradientAnimation styles="h-56 w-full" />
        <LinearGradientAnimation styles="my-3 h-6 w-1/2" />

        {/* game developers & publishers */}
        <LinearGradientAnimation styles="h-4 w-1/3" />
        <LinearGradientAnimation styles="my-2 h-4 w-1/3" />
        <LinearGradientAnimation styles="h-4 w-1/3" />

        {/* game description */}
        <LinearGradientAnimation styles="my-6 h-full w-full" />
      </View>
    </View>
  );
};

export default GameSkeleton;
