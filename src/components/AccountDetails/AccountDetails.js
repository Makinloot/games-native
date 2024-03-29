import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAppContext } from "../../utils/context/ContextProvider";
import { getUser, updateUser } from "../../utils/hooks/useDb";
import { useState } from "react";

import Deactivate from "./Deactivate";

const AccountDetails = ({ setLoading }) => {
  const { currentUser, handleSignout } = useAppContext();
  const { name, email } = getUser(currentUser.email);
  const [isEdited, setIsEdited] = useState("");
  const [newNameValue, setNewNameValue] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <View className="my-5 items-center justify-center px-5">
      <View className="w-full max-w-[500px]">
        <View className="flex-row items-center py-3">
          <Text className="font-roboto text-base capitalize text-white/50">
            email
          </Text>
          <Text className="ml-2 font-roboto text-base capitalize text-white">
            {email}
          </Text>
          <View className="absolute bottom-0 mt-2 h-[1px] w-full bg-white/30" />
        </View>
        <View className="flex-row items-center py-1">
          <Text className="font-roboto text-base capitalize text-white/50">
            first name
          </Text>
          {isEdited === "name" ? (
            <TextInput
              placeholder="New name ..."
              className="ml-2 w-[220px] py-2 font-roboto text-base capitalize text-white"
              placeholderTextColor="gray"
              onChangeText={(e) => setNewNameValue(e)}
              value={newNameValue}
              onSubmitEditing={() => {
                setIsEdited("");
                updateUser(email, "name", newNameValue);
                setNewNameValue("");
              }}
            />
          ) : (
            <Text className="ml-2 py-2 font-roboto text-base capitalize text-white">
              {name}
            </Text>
          )}
          {isEdited === "name" ? (
            <TouchableOpacity
              className="absolute right-2 h-full w-8 items-center justify-center"
              onPress={() => setIsEdited("")}
            >
              <AntDesign name="close" color="white" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="absolute right-2 h-full w-8 items-center justify-center"
              onPress={() => setIsEdited("name")}
            >
              <AntDesign name="edit" color="white" size={20} />
            </TouchableOpacity>
          )}
          <View className="absolute bottom-0 mt-2 h-[1px] w-full bg-white/30" />
        </View>

        {/* delete account */}
        {isInputVisible && (
          <Deactivate
            setLoading={setLoading}
            setIsInputVisible={setIsInputVisible}
          />
        )}
      </View>
      <View className="mt-24 w-full max-w-[500px]">
        <TouchableOpacity
          className="mt-4 w-full bg-lightBlue p-2"
          onPress={handleSignout}
        >
          <Text className="text-center font-robotoBold text-lg text-white">
            Sign out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 w-full bg-red-600 p-2"
          onPress={() => {
            setIsInputVisible(true);
          }}
        >
          <Text className="text-center font-robotoBold text-lg text-white">
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountDetails;
