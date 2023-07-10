import { View, Text, TextInput } from "react-native";

const InputField = ({
  // name,
  placeholder,
  handleChange,
  value,
  keyboardType,
  secureText,
  handleBlur,
}) => {
  return (
    <TextInput
      className="w-full font-roboto text-white"
      placeholder={placeholder}
      placeholderTextColor="white"
      onChangeText={handleChange}
      value={value}
      keyboardType={keyboardType && keyboardType}
      secureTextEntry={secureText && true}
      onBlur={handleBlur}
    />
  );
};

export default InputField;
