import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../utils/requests";
import SearchResults from "./SearchResults";
import UserProfile from "../userProfile/UserProfile";
import { useAppContext } from "../../utils/context/ContextProvider";

// navigate to list page by query
const handleSubmit = (navigation, query) => {
  navigation.navigate("List", {
    list_url: `${requests.search}${query}`,
    filtered_by: query,
  });
};

const Search = ({ navigation }) => {
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { handleSignout } = useAppContext();

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // if search value is less than 3 characters set empty array in searchResults state
    if (inputValue.length > 3) {
      axios
        .get(`${requests.search}${inputValue}&page_size=10`)
        .then((res) => setSearchResults(res.data.results));
    } else setSearchResults([]);
  }, [inputValue]);

  return (
    <View className="">
      <View className="h-11 flex-row items-center justify-between bg-aquaBlue">
        <View className="relative w-full flex-1 px-2">
          <TextInput
            placeholder="Search"
            className="h-full w-full font-roboto text-lg text-white"
            placeholderTextColor="white"
            autoCorrect={false}
            onFocus={() => setActive(true)}
            onChangeText={(e) => setInputValue(e)}
            onSubmitEditing={() => {
              handleSubmit(navigation, inputValue);
              setActive(false);
            }}
            value={inputValue}
          />
          {inputValue.length <= 0 ? (
            <View className="pointer-events-none absolute right-0 h-full w-9 items-center justify-center transition-all">
              <MaterialCommunityIcons name="magnify" size={26} color="white" />
            </View>
          ) : (
            <TouchableOpacity
              className="absolute right-0 h-full w-9 items-center justify-center"
              activeOpacity={1}
              onPress={() => {
                setInputValue("");
                Keyboard.dismiss();
              }}
            >
              <MaterialIcons name="clear" size={26} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View className="mx-2 h-[60%] w-[1px] bg-white/40" />
        <View className="p-1">
          <UserProfile stylesImage="h-9 w-9" sideBar={handleSideBar} />
        </View>
      </View>
      {isOpen && (
        <View className="mt-4 h-[100px] w-full items-center justify-center py-4 ease-in">
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            className="absolute -top-3 left-0"
          >
            <AntDesign name="close" color="white" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/2"
            onPress={() => navigation.navigate("Account")}
          >
            <Text className=" bg-lightBlue text-center font-robotoBold text-base capitalize text-white">
              profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2" onPress={handleSignout}>
            <Text className="mt-2 bg-lightBlue text-center font-robotoBold text-base capitalize text-white">
              sign out
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {active && (
        <SearchResults
          searchResults={searchResults}
          navigation={navigation}
          setInputValue={setInputValue}
          setActive={setActive}
        />
      )}
    </View>
  );
};

export default Search;
