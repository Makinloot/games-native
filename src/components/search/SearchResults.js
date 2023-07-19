import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import noImg from "../../../assets/no-img.png";
const SearchResults = ({ searchResults, navigation, setInputValue }) => {
  const handleNavigation = (id) => navigation.navigate("Game", { id });
  return (
    <ScrollView className={searchResults.length > 0 && "mt-2 h-auto max-h-72"}>
      {searchResults
        .map((item, i) => (
          <TouchableOpacity
            onPress={() => {
              handleNavigation(item.id);
              setInputValue("");
            }}
            className={`flex-row bg-gray-600 p-1 ${i !== 0 && "mt-2"}`}
            key={item.id}
          >
            <Image
              source={
                item.background_image ? { uri: item.background_image } : noImg
              }
              className={`h-14 w-28`}
              style={{ resizeMode: "cover" }}
            />
            <View className="ml-2 justify-around">
              <Text
                className="w-[90%] font-robotoBold text-white"
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <Text className="font-robotoBold text-gray-300" numberOfLines={1}>
                {item.genres.map((genre) => genre.name).join(", ")}
              </Text>
            </View>
          </TouchableOpacity>
        ))
        .slice(0, 5)}
    </ScrollView>
  );
};

export default SearchResults;
