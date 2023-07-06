import { View, FlatList } from "react-native";
const RowSkeleton = ({ useMap }) => {
  const data = Array.from({ length: 10 });

  if (useMap) {
    return (
      <View className="mt-8">
        {data.map((item, i) => (
          <View className="w-full flex-row bg-aquaBlue py-1" key={i}>
            <View className="mr-1 h-20 w-1/3 bg-red-100" />
            <View className="w-full justify-between">
              <View className="h-4 w-1/2 bg-red-200" />
              <View className="h-4 w-1/4 bg-red-200" />
              <View className="h-4 w-1/6 bg-red-200" />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className="my-8">
      <View className="mb-4 h-8 bg-red-100" />
      <FlatList
        data={data}
        renderItem={() => (
          <View className="relative w-72 bg-aquaBlue pb-2">
            <View className="h-64 w-max bg-red-100" />
            <View className="p-2">
              <View className="mb-3 mt-1 h-4 w-full bg-red-100" />
              <View className="absolute bottom-0 left-2 h-4 w-1/2 bg-red-100" />
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
