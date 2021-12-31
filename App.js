import React, { useRef } from "react";
import styled from "styled-components/native";
import { Animated, PanResponder, Dimensions } from "react-native";
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
      x: 0,
      y: 0,
    })
  ).current;

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });

  const bgColor = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255, 99, 71)", "rgb(2, 166, 255)"],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // position.addListener(() => console.log(position.getTranslateTransform()));

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: position.getTranslateTransform(),
        }}
      />
    </Container>
  );
}
