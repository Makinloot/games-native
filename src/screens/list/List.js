import { View, Text } from "react-native";
import Search from "../../components/search/Search";
import PaginatedList from "../../components/PaginatedList";

const List = ({ route, navigation }) => {
  const { list_url, filtered_by } = route.params;

  // TODO: ADD FUNCTIONALITY FOR LIST SCREEN TO FILTER GIVEN DATA IN VARIOUS WAYS
  return (
    <View className="flex-1 bg-nightBlue p-2">
      <View>
        <Search navigation={navigation} />
      </View>
      <View className="my-2 flex-row">
        <Text className="font-robotoBold text-lg text-white">
          Filtered by
          <Text className="uppercase text-lightBlue"> {filtered_by}</Text>
        </Text>
      </View>
      <View className="flex-1">
        <PaginatedList api_url={list_url} />
      </View>
    </View>
  );
};

export default List;
