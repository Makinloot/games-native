import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { useAppContext } from "../utils/context/ContextProvider";
import { getUser } from "../utils/hooks/useDb";
import Row from "../components/row/Row";
import UserProfile from "../components/userProfile/UserProfile";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const handleNavigation = () => navigation.navigate("Browse");
  const { handleSignout, currentUser, saveUser } = useAppContext();
  const { name, id } = getUser(currentUser.email);
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View className="relative flex-1 p-2">
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="flex-row justify-between">
          <Text className="my-5 text-xl capitalize text-white">
            Welcome back {name}
          </Text>
          <View className="my-4">
            <UserProfile stylesImage="h-9 w-9" sideBar={handleSideBar} />
          </View>
        </View>
        {isOpen && (
          <View className="mt-4 h-[100px] w-full items-center justify-center py-4 ease-in">
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="absolute -top-3 left-0"
            >
              <AntDesign name="close" color="white" size={28} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-1/2"
              onPress={() => navigation.navigate("Account")}
            >
              <Text className=" bg-lightBlue text-center font-robotoBold text-base capitalize text-white">
                profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/2" onPress={handleSignout}>
              <Text className="mt-2 bg-lightBlue text-center font-robotoBold text-base capitalize text-white">
                sign out
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="my-5">
          <Row
            title="best of the week"
            url={requests.weekly}
            navigate={handleNavigation}
          />
        </View>
        <View className="my-5">
          <Row
            title="popular upcoming"
            url={requests.upcoming}
            navigate={handleNavigation}
          />
        </View>
        <View className="my-5">
          <Row
            title="best of 2023"
            url={requests.yearlyUrl}
            navigate={handleNavigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
