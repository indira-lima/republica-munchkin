import React, { useCallback, useEffect } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useGame from "../../../core/hooks/useGame";
import globalStyles from "../../../core/utils/styles";

// @ts-ignore
import buttonImg from "../../../../../assets/BigStartButton.png";

interface BigStartButtonProps {
  // nothing
}

/**
 * An animated button that sets the game state to the players selection
 */
const BigStartButton: React.FunctionComponent<BigStartButtonProps> = () => {
  const { setGameState } = useGame();

  const animation = useSharedValue(0);

  /** Animate the component mounting */
  useEffect(() => {
    animation.value = 1;
  }, []);

  /** Animate to the choosing-players state */
  const handleStart = useCallback(() => {
    animation.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setGameState)("choosing-players");
    });
  }, []);

  /**
   * Set the scale of the button based on the animation value,
   * giving a zoom in/out effect
   */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(animation.value, {
            mass: 0.5,
            stiffness: 500,
            damping: 20,
          }),
        },
      ],
    };
  });

  return (
    <View>
      <Animated.View style={[globalStyles.flexCenter, animatedStyles]}>
        <TouchableWithoutFeedback onPress={handleStart}>
          <FastImage source={buttonImg} style={{ width: 250, height: 250 }} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

export default BigStartButton;
