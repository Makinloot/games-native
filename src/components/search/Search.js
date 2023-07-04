import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import requests from "../../utils/requests";
import SearchResults from "./SearchResults";

const Search = ({ navigation }) => {
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (inputValue.length > 3) {
      axios
        .get(`${requests.search}${inputValue}`)
        .then((res) => setSearchResults(res.data.results));
    } else setSearchResults([]);
  }, [inputValue]);

  return (
    <View>
      <View className="relative h-11 bg-aquaBlue px-2 pr-8">
        <TextInput
          placeholder="Search"
          className="h-full w-full font-roboto text-lg text-white"
          placeholderTextColor="white"
          autoCorrect={false}
          onFocus={() => setActive(true)}
          onChangeText={(e) => setInputValue(e)}
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
