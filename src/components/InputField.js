import { View, Text, TextInput } from "react-native";

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
  return (
    <View className="my-2 w-full">
      <Text
        className={`mb-1 font-robotoBold text-base capitalize ${
          error ? `text-red-700` : `text-white`
        }`}
      >
        {error ? error : label}
      </Text>
      <TextInput
        className="my-1 w-full items-center rounded-[4px] border border-white px-3 py-2 font-roboto text-base text-white"
        placeholderTextColor="white"
        placeholder={placeholder}
        onChangeText={handleChange}
        value={value}
        keyboardType={keyboardType && keyboardType}
        secureTextEntry={secureText && true}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default InputField;
