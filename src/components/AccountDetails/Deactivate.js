import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { deactivateAccount } from "./accountFunctions";
import { useAppContext } from "../../utils/context/ContextProvider";

const Deactivate = ({ setIsInputVisible, setLoading }) => {
  const { currentUser } = useAppContext();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <View className="mt-7">
      <Text
        className={`font-roboto text-sm ${
          error ? "text-red-600" : "text-white/50"
        }`}
      >
        {error ? error : "Type your password to deactivate account"}
      </Text>
      <View className="flex-row items-center py-1">
        <TextInput
          className="ml-2 w-[220px] py-2 font-roboto text-base capitalize text-white"
          placeholder="password"
          placeholderTextColor="white"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <View className="absolute bottom-0 mt-2 h-[1px] w-full bg-white/30" />
      </View>
      <View className="flex-row justify-end">
        <TouchableOpacity
          className="mr-2 mt-2"
          onPress={async () => {
            setLoading(true);
            await deactivateAccount(currentUser.email, password, setError);
            setLoading(false);
          }}
        >
          <Text className="self-end bg-red-600 px-3 py-1 text-base capitalize text-white">
            submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2"
          onPress={() => setIsInputVisible(false)}
        >
          <Text className="self-end bg-lightBlue px-3 py-1 text-base capitalize text-white">
            cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Deactivate;
