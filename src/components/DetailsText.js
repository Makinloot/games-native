import { View, Text } from "react-native";

const DetailsText = ({
  data,
  title,
  customText,
  longTitle,
  titleColor,
  textColor,
}) => {
  return (
    <View className="flex-row">
      <Text
        className={`${
          !longTitle ? `w-20` : `mr-2`
        } whitespace-nowrap font-roboto text-base capitalize ${titleColor}`}
      >
        {title}
      </Text>
      <Text
        className={`font-roboto text-base capitalize ${textColor}`}
        numberOfLines={1}
      >
        {data ? data.map((creator) => creator.name).join(", ") : customText}
      </Text>
    </View>
  );
};

DetailsText.defaultProps = {
  titleColor: "text-[#8A97A0]",
  textColor: "text-lightBlue",
};

export default DetailsText;
