import { View, Text, TouchableOpacity } from "react-native";

const AuthButton = ({ icon, text, bgColor, handleSubmit }) => {
  return (
    <TouchableOpacity
      className={`relative w-full flex-row justify-center border ${bgColor} p-2`}
      onPress={handleSubmit && handleSubmit}
    >
      {icon && <View className="absolute left-3 top-2 mr-4">{icon}</View>}
      <Text className="font-robotoBold text-lg capitalize text-white">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
