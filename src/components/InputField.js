import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const InputField = ({
  label,
  placeholder,
  handleChange,
  value,
  keyboardType,
  secureText,
  handleBlur,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="my-2 w-full">
      <Text
        className={`mb-1 font-robotoBold text-base capitalize ${
          error ? `text-red-700` : `text-white`
        }`}
      >
        {error ? error : label}
      </Text>
      <View className="relative">
        <TextInput
          className={`my-1 w-full flex-1 items-center rounded-[4px] border border-white px-3 font-roboto text-base text-white ${
            Platform.OS === "ios" ? "pb-3 pt-1" : "py-2"
          }`}
          placeholderTextColor="white"
          placeholder={placeholder}
          onChangeText={handleChange}
          value={value}
          keyboardType={keyboardType && keyboardType}
          secureTextEntry={secureText && !showPassword && true}
          onBlur={handleBlur}
        />
        {/* if password input add show and hide psw button */}
        {secureText && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Entypo name="eye-with-line" color="white" size={28} />
            ) : (
              <Entypo name="eye" color="white" size={28} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
