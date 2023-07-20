import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import UserProfile from "../components/userProfile/UserProfile";
import requests from "../utils/requests";
import PaginatedList from "../components/PaginatedList";
import { getLikedItems } from "../utils/hooks/useDb";

import { useAppContext } from "../utils/context/ContextProvider";

const Library = () => {
  const { width } = useWindowDimensions();
  const { currentUser } = useAppContext();
  const likes = getLikedItems(currentUser.uid);

  return (
    <View className="flex-1 bg-nightBlue p-2">
      <View className="flex-row">
        <UserProfile cover />
        <Text
          className={`ml-3 mt-[25vh] self-end font-robotoBold text-white ${
            width > 600 ? "text-5xl" : "text-3xl"
          }`}
        >
          Your library
        </Text>
      </View>
      <View className="my-5 h-[1px] w-full bg-white/50" />
      <View className="mb-5">
        <Text className="font-robotoBold text-white">Liked games</Text>
      </View>

      <View className="flex-1">
        <PaginatedList
          api_url={likes.length > 0 && `${requests.games_collection}${likes}`}
          list_name="likes"
        />
      </View>
    </View>
  );
};

export default Library;
