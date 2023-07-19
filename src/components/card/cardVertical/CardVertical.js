import { View, Text, Image } from "react-native";
import noImg from "../../../../assets/no-img.png";
import filterGamePlatforms from "../../../utils/platforms";
import { useWindowDimensions } from "react-native";

const CardVertical = ({ background_image, name, platforms, released }) => {
  const { width } = useWindowDimensions();
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
        className={`mr-1 ${width <= 480 ? "h-24 w-[150px]" : "h-32 w-[250px]"}`}
      />
      <View
        className={`w-full ${
          width <= 480 ? "justify-between" : "justify-around"
        }`}
      >
        <Text
          className={`w-[60%] font-robotoBold text-base text-white`}
          numberOfLines={1}
        >
          {name}
        </Text>

        <View className="flex-row gap-1">{filterGamePlatforms(platforms)}</View>
        <Text className="font-robotoLight text-xs text-white">
          {released?.split("-").reverse().join(".")}
        </Text>
      </View>
    </View>
  );
};

export default CardVertical;
