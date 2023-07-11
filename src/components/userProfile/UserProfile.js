import { View, Text, Image, TouchableOpacity } from "react-native";
import noImg from "../../../assets/no-img.png";
import { useAppContext } from "../../utils/context/ContextProvider";

const UserProfile = () => {
  const { currentUser } = useAppContext();
  return (
    <View>
      <TouchableOpacity className="h-full w-[44px] items-center justify-center bg-slate-500">
        {currentUser?.photoURL ? (
          <Image
            source={{ uri: currentUser.photoURL }}
            className="h-full w-full"
            style={{ resizeMode: "cover" }}
          />
        ) : (
          <Text className="font-robotoLight text-4xl uppercase text-white">
            {currentUser.email.split("")[0]}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
