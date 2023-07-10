import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useAppContext } from "../../utils/context/ContextProvider";

const Auth = () => {
  const { handleLogin } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await handleLogin(email, password);
      console.log("user logged in");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View className="w-[240px] items-center">
      <View className="my-2 w-full rounded-md border border-white px-2 py-1">
        <TextInput
          className="w-full font-roboto text-white"
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCompleteType="email"
        />
      </View>
      <View className="my-2 w-full rounded-md border border-white px-2 py-1">
        <TextInput
          className="w-full font-roboto text-white"
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        className="self-end rounded-md bg-aquaBlue px-5 py-2"
        onPress={handleSubmit}
      >
        <Text className="font-roboto capitalize text-white">login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
