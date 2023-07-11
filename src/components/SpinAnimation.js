import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SpinAnimation = ({ iconSize }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="items-center justify-center">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        {/* <Text className="text-3xl text-white">Spinning Animation</Text> */}
        <AntDesign name="loading1" color="white" size={iconSize} />
      </Animated.View>
    </View>
  );
};

export default SpinAnimation;
