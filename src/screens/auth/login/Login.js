import { View, Text } from "react-native";
import Auth from "../../../components/auth/Auth";

const Login = () => {
  return (
    <View className="flex-1 items-center justify-center bg-nightBlue p-2">
      {/* ADD LOGO LATER */}
      <Auth />
    </View>
  );
};

export default Login;
