import { View, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

const LinearGradientAnimation = ({ styles }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800, // Duration of the forward animation in milliseconds
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800, // Duration of the backward animation in milliseconds
          useNativeDriver: false,
        }),
      ]).start(animate);
    };

    animate();
  }, []);

  return (
    <Animated.View
      className={`${styles}`}
      style={{
        backgroundColor: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["rgba(140, 140, 140, 1)", "rgba(190, 190, 190, 1)"],
        }),
      }}
    />
  );
};

export default LinearGradientAnimation;
