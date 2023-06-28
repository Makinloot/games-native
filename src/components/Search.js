import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";

const Search = () => {
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return (
    <View className="relative h-11 bg-[#292C35] px-2 pr-8">
      <TextInput
        placeholder="Search"
        className="h-full w-full font-roboto text-lg text-white"
        placeholderTextColor="white"
        autoCorrect={false}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChangeText={(e) => setInputValue(e)}
        value={inputValue}
      />
      {!active ? (
        <View className="absolute right-0 h-full w-9 items-center justify-center transition-all">
          <MaterialCommunityIcons name="magnify" size={26} color="white" />
        </View>
      ) : (
        <TouchableOpacity
          className="absolute right-0 h-full w-9 items-center justify-center"
          activeOpacity={1}
          onPress={() => setInputValue("")}
        >
          <MaterialIcons name="clear" size={26} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
