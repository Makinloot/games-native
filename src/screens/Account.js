import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import UserProfile from "../components/userProfile/UserProfile";
import { getUser } from "../utils/hooks/useDb";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../utils/context/ContextProvider";
import AccountDetails from "../components/AccountDetails/AccountDetails";
import SpinAnimation from "../components/SpinAnimation";
import { useState } from "react";
const Account = () => {
  const { currentUser, pickImage } = useAppContext();
  const { name } = getUser(currentUser.email);
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1 bg-nightBlue p-2">
      <ScrollView>
        <View className="h-[30vh] items-center justify-center">
          <View className="">
            <UserProfile
              stylesContainer="rounded-full p-4 h-28 w-28"
              stylesImage="h-28 w-28 rounded-full"
            />

            <View className="absolute bottom-0 right-0 z-20 rounded-full bg-slate-700 p-1">
              <TouchableOpacity onPress={() => pickImage()}>
                <Ionicons name="add" color="white" size={28} />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-2 font-robotoBold text-xl capitalize text-white">
            {name}
          </Text>
        </View>
        <AccountDetails setLoading={setLoading} />
      </ScrollView>
      {loading && (
        <View className="absolute h-full w-full items-center justify-center bg-nightBlue/75">
          <SpinAnimation iconSize={80} />
        </View>
      )}
    </View>
  );
};

export default Account;
