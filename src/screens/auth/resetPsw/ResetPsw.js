import { View } from "react-native";
import Auth from "../../../components/auth/Auth";
const ResetPsw = () => {
  return (
    <View className="flex-1 items-center justify-center bg-nightBlue p-2">
      <Auth reset />
    </View>
  );
};

export default ResetPsw;
