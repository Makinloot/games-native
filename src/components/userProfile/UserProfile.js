import { View, Text, Image, TouchableOpacity } from "react-native";
import noImg from "../../../assets/no-img.png";

const UserProfile = ({ img }) => {
  return (
    <View>
      <TouchableOpacity className="h-full w-[44px] items-center justify-center bg-slate-500">
        {img ? (
          <Image
            // source={{ uri: img }}
            source={noImg}
            className="h-full w-full"
            style={{ resizeMode: "cover" }}
          />
        ) : (
          <Text className="font-robotoLight text-4xl uppercase text-white">
            t
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
