import { View, FlatList } from "react-native";
import LinearGradientAnimation from "../linearGradientAnimation/LinearGradientAnimation";

const RowSkeleton = ({ useMap }) => {
  const data = Array.from({ length: 10 });

  if (useMap) {
    return (
      <View className="mt-8">
        {data.map((item, i) => (
          <View className="w-full flex-row bg-aquaBlue py-1" key={i}>
            <LinearGradientAnimation styles="mr-1 h-20 w-1/3 bg-red-100" />
            <View className="w-full justify-between">
              <LinearGradientAnimation styles="h-4 w-1/2 bg-red-200" />
              <LinearGradientAnimation styles="h-4 w-1/4 bg-red-200" />
              <LinearGradientAnimation styles="h-4 w-1/6 bg-red-200" />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className="my-8">
      <LinearGradientAnimation styles="mb-4 h-8 w-[65%]" />
      <FlatList
        data={data}
        renderItem={() => (
          <View className="relative w-72 bg-aquaBlue pb-2">
            <LinearGradientAnimation styles="h-64 w-max" />
            <View className="p-2">
              <LinearGradientAnimation styles="mb-3 mt-1 h-4 w-full" />
              <LinearGradientAnimation styles="absolute bottom-0 left-2 h-4 w-1/2" />
            </View>
          </View>
        )}
        horizontal
        ItemSeparatorComponent={() => <View className="h-2 w-2" />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RowSkeleton;
