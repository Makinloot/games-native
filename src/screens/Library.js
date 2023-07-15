import { View, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import UserProfile from "../components/userProfile/UserProfile";
import requests from "../utils/requests";
import PaginatedList from "../components/PaginatedList";
import { getLikedItems } from "../utils/hooks/useDb";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase";
import { useAppContext } from "../utils/context/ContextProvider";

const Library = () => {
  const { currentUser } = useAppContext();
  const likes = getLikedItems(currentUser.uid);

  console.log("YAY", likes);

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
        <PaginatedList
          api_url={`${requests.games_collection}${likes}`}
          list_name="likes"
        />
      </View>
    </View>
  );
};

export default Library;
