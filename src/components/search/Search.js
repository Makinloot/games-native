import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import requests from "../../utils/requests";
import SearchResults from "./SearchResults";
import UserProfile from "../userProfile/UserProfile";

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
          <UserProfile stylesImage="h-9 w-9" />
        </View>
      </View>
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
