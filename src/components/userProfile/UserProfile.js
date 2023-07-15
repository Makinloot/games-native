import { View, Text, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import defaultUser from "../../../assets/user.png";
import { getUser } from "../../utils/hooks/useDb";
import { useState } from "react";

const UserProfile = ({ stylesContainer, stylesImage, sideBar }) => {
  const { navigate } = useNavigation();

  return (
    <>
      <TouchableOpacity
        className={`${stylesContainer} pointer-events-none items-center justify-center bg-lightBlue`}
        onPress={() => (sideBar ? sideBar() : navigate("Account"))}
        activeOpacity={1}
      >
        {/* {currentUser?.photoURL ? (
          <Image
            source={{ uri: currentUser.photoURL }}
            className="h-full w-full"
            style={{ resizeMode: "cover" }}
          />
        ) : (
          <Text className="font-robotoLight text-4xl uppercase text-white">
            {currentUser.email.split("")[0]}
          </Text>
        )} */}
        <Image source={defaultUser} className={stylesImage} />
      </TouchableOpacity>
    </>
  );
};

UserProfile.defaultProps = {
  stylesImage: "h-20 w-20",
};

export default UserProfile;
