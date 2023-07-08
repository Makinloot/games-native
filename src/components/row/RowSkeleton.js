import { View, FlatList } from "react-native";
import LinearGradientAnimation from "../linearGradientAnimation/LinearGradientAnimation";
import CardVerticalSkeleton from "../card/cardVertical/CardVerticalSkeleton";
import CardHorizontalSkeleton from "../card/cardHorizontal/CardHorizontalSkeleton";

const RowSkeleton = ({ useMap }) => {
  const data = Array.from({ length: 10 });

  if (useMap) {
    return (
      <View className="mt-8">
        {data.map((item, i) => (
          <CardVerticalSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View className="my-8">
      <LinearGradientAnimation styles="mb-4 h-8 w-[65%]" />
      <FlatList
        data={data}
        renderItem={() => <CardHorizontalSkeleton />}
        horizontal
        ItemSeparatorComponent={() => <View className="h-2 w-2" />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RowSkeleton;
