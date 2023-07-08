import { View, Text, Image } from "react-native";
import noImg from "../../../../assets/no-img.png";
import filterGamePlatforms from "../../../utils/platforms";

const CardVertical = ({ background_image, name, platforms, released }) => {
  return (
    <View className="w-full flex-row bg-aquaBlue py-1">
      <Image
        source={
          background_image
            ? {
                uri: background_image,
              }
            : noImg
        }
        className="mr-1 h-20 w-1/3"
        style={{ resizeMode: "cover" }}
      />
      <View className="w-full justify-between">
        <Text
          className="w-[60%] font-robotoBold text-base text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
        <View className="flex-row gap-1">{filterGamePlatforms(platforms)}</View>
        <Text className="font-robotoLight text-xs text-white">
          {released.split("-").reverse().join(".")}
        </Text>
      </View>
    </View>
  );
};

export default CardVertical;
