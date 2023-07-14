import { View, Text } from "react-native";
import React, { useRef } from "react";
import UserProfile from "../components/userProfile/UserProfile";
import requests from "../utils/requests";
import PaginatedList from "../components/PaginatedList";

const Library = () => {
  return (
    <View className="flex-1 bg-nightBlue p-2">
      <View className="flex-row">
        <UserProfile />
        <Text className="ml-3 self-end font-robotoBold text-3xl text-white">
          Your library
        </Text>
      </View>
      <View className="my-5 h-[1px] w-full bg-white/50" />
      <View className="mb-5">
        <Text className="font-robotoBold text-white">Liked games</Text>
      </View>

      {/* TODO: retrieve liked items instead of yearlyUrl data */}
      <View className="flex-1">
        <PaginatedList api_url={requests.yearlyUrl + "page_size=10"} />
      </View>
    </View>
  );
};

export default Library;
