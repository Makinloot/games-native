import { ScrollView, View, Text } from "react-native";
import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";
import AuthButton from "./AuthButton";
import { AntDesign } from "@expo/vector-icons";
import AuthReset from "./AuthReset";

const Auth = ({ login, reset }) => {
  return (
    <ScrollView
      className="mt-8 w-full max-w-[340px]"
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center">
        {/* Auth title */}
        <Text className="mb-8 self-start font-roboto text-4xl text-white">
          {login
            ? "Log in to Whistle"
            : reset
            ? "Reset password"
            : "Register to Whistle"}
        </Text>

        {/* auth with gmail or facebook buttons */}
        {/* {!reset && (
          <>
            <AuthButton
              icon={<AntDesign name="google" color="white" size={28} />}
              text="continue with google"
              bgColor="bg-red-500 mb-1"
            />
            <AuthButton
              icon={
                <AntDesign name="facebook-square" color="white" size={28} />
              }
              text="continue with facebook"
              bgColor="bg-blue-500 mb-5"
            />
          </>
        )} */}

        {/* divider */}
        <View className="my-4 h-[1px] w-full bg-white/30" />

        {/* return either login or register form */}
        {login ? <AuthLogin /> : reset ? <AuthReset /> : <AuthRegister />}
      </View>
    </ScrollView>
  );
};

export default Auth;
