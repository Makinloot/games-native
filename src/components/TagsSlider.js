import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

const TagsSlider = ({ data, clickable, active, setActive }) => {
  function handlePress(item) {
    setActive({
      slug: item.slug,
      name: item.name,
    });
  }

  if (!data) return;

  return (
    <View>
      <Text className="mb-2 font-robotoBold text-xl uppercase text-[#8A97A0]">
        tags
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="h-16 flex-row items-start gap-2">
          {data.map((item) => (
            <TouchableOpacity
              activeOpacity={1}
              key={item.id}
              onPress={() => clickable && handlePress(item)}
            >
              <Text
                className={`p-1 font-robotoBold text-base text-white ${
                  active && item.name === active.name
                    ? `border-b border-b-slate-300 bg-nightBlue`
                    : `bg-[#445586]`
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

TagsSlider.defaultProps = {
  clickable: false,
};

export default TagsSlider;
