import { View, Text } from "react-native";
import React, { useState } from "react";

const GameAdditionalContent = ({ data }) => {
  return (
    <View>
      <Text className="my-2 font-robotoBold uppercase text-white">
        content for this game
      </Text>
      {data.map((item) => (
        <View className="mt-1 bg-[#3A434B] p-1" key={item.id}>
          <Text className="font-robotoLight text-white">{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default GameAdditionalContent;
