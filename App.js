import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.TouchableOpacity`
  background-color: powderblue;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const Y = new Animated.Value(0);
  const moveUp = () => {};

  return (
    <Container>
      <AnimatedBox
        onPress={moveUp}
        style={{
          transform: [{ translateY: Y }],
        }}
      />
    </Container>
  );
}
