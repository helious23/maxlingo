import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, PanResponder, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const CardContaier = styled.View`
  flex: 5;
  justify-content: center;
  align-items: center;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 250px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
`;

const BtnContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 15px;
`;

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
    outputRange: ["-15deg", "15deg"],
    // extrapolate: "clamp",
  });
  const secondScale = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const goLeft = Animated.spring(position, {
    toValue: -SCREEN_WIDTH - 100,
    tension: 1,
    useNativeDriver: true,
    restSpeedThreshold: 250,
    restDisplacementThreshold: 250,
  });

  const goRight = Animated.spring(position, {
    toValue: SCREEN_WIDTH + 100,
    tension: 1,
    useNativeDriver: true,
    restSpeedThreshold: 250,
    restDisplacementThreshold: 250,
  });

  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex((prev) => prev + 1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -120) {
          goLeft.start(onDismiss);
        } else if (dx > 120) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  const closePress = () => goLeft.start(onDismiss);
  const checkPress = () => goRight.start(onDismiss);

  return (
    <Container>
      <CardContaier>
        <Card
          style={{
            transform: [{ scale: secondScale }],
          }}
        >
          <Ionicons name={icons[index + 1]} color={"#192a56"} size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            elevation: 20,
            transform: [
              { scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        >
          <Ionicons name={icons[index]} color={"#192a56"} size={98} />
        </Card>
      </CardContaier>
      <BtnContainer>
        <Btn>
          <Ionicons
            name="close-circle-outline"
            color="white"
            size={48}
            onPress={closePress}
          />
        </Btn>
        <Btn>
          <Ionicons
            name="checkmark-circle-outline"
            color="white"
            size={48}
            onPress={checkPress}
          />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
