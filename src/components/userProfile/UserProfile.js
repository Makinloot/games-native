import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import defaultUser from "../../../assets/user.png";
import { useAppContext } from "../../utils/context/ContextProvider";
import noImg from "../../../assets/no-img.png";

const UserProfile = ({ stylesContainer, stylesImage, sideBar, cover }) => {
  const { navigate } = useNavigation();
  const { avatar } = useAppContext();

  if (!avatar)
    return (
      <View className="absolute w-full">
        <Image
          source={defaultUser}
          className="absolute h-[30vh] w-full"
          style={{ resizeMode: "contain" }}
        />
        <TouchableOpacity onPress={() => navigate("Account")}>
          <Text className="self-end font-robotoBold text-base text-white">
            Account settings
          </Text>
        </TouchableOpacity>
      </View>
    );
  if (cover) {
    return (
      <View className="absolute w-full">
        <Image
          source={{ uri: avatar }}
          className="absolute h-[30vh] w-full"
          style={{ resizeMode: "cover" }}
        />
        <TouchableOpacity onPress={() => navigate("Account")}>
          <Text className="self-end font-robotoBold text-base text-white">
            Account settings
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        className={`${stylesContainer} pointer-events-none items-center justify-center bg-lightBlue`}
        onPress={() => (sideBar ? sideBar() : navigate("Account"))}
        activeOpacity={1}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            className={`${stylesImage}`}
            style={{ resizeMode: "cover" }}
          />
        ) : (
          <Image source={defaultUser} className={stylesImage} />
        )}
      </TouchableOpacity>
    </>
  );
};

UserProfile.defaultProps = {
  stylesImage: "h-20 w-20",
};

export default UserProfile;
