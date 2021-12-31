import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Pressable, TouchableOpacity } from "react-native";
import { Easing } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: powderblue;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(position, {
      toValue: up ? 200 : -200,
      useNativeDriver: false,
      duration: 1000,
    }).start(toggleUp);
  };

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });

  const rotation = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["-360deg", "360deg"],
  });

  const bgColor = position.y.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["rgb(255, 99, 71)", "rgb(255,255,255)", "rgb(2, 166, 255)"],
  });

  position.addListener(() => console.log(bgColor));

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [{ translateY: position.y }, { rotateY: rotation }],
          }}
        />
      </Pressable>
    </Container>
  );
}
