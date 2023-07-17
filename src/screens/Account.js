import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import UserProfile from "../components/userProfile/UserProfile";
import { getUser } from "../utils/hooks/useDb";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../utils/context/ContextProvider";
import AccountDetails from "../components/AccountDetails";

const Account = () => {
  const { currentUser } = useAppContext();
  const { name } = getUser(currentUser.email);
  return (
    <View className="flex-1 bg-nightBlue p-2">
      <ScrollView>
        <View className="h-[30vh] items-center justify-center">
          <View className="">
            <UserProfile stylesContainer="rounded-full p-4" />

            <View className="absolute bottom-0 right-0 z-20 rounded-full bg-slate-700 p-1">
              <TouchableOpacity>
                <Ionicons name="add" color="white" size={28} />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-2 font-robotoBold text-xl capitalize text-white">
            {name}
          </Text>
        </View>
        <AccountDetails />
      </ScrollView>
    </View>
  );
};

export default Account;
