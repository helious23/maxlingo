import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Pressable, Dimensions } from "react-native";
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const position = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;

  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
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
    inputRange: [-200, 200],
    outputRange: ["rgb(255, 99, 71)", "rgb(2, 166, 255)"],
  });

  position.addListener(() => console.log(position.getTranslateTransform()));

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [
              // { rotateY: rotation },
              ...position.getTranslateTransform(),
            ],
          }}
        />
      </Pressable>
    </Container>
  );
}
