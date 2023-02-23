import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";

interface AnimatedPanelProps {
  isPanelOPen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

/**
 * Animated panel that opens with a vertical sliding effect
 */
const AnimatedPanel: React.FunctionComponent<AnimatedPanelProps> = ({
  children,
  isPanelOPen,
  onClose,
}) => {
  const animation = useSharedValue(0);
  const [containerMaxHeight, setContainerMaxHeight] = useState<number>(0);

  /**
   * Animate the open/close state change
   *
   * To get the actual available space for the container,
   * we need to listen to the onLayout event and change
   * the containerMaxHeight
   */
  useEffect(() => {
    if (isPanelOPen) {
      animation.value = withTiming(containerMaxHeight);
    } else {
      animation.value = withTiming(0, {}, () => {
        if (typeof onClose === "function") {
          runOnJS(onClose)();
        }
      });
    }
  }, [isPanelOPen, containerMaxHeight]);

  /**
   * Sets the containerMaxHeight when the parent View gets drawn
   */
  const handleOnContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerMaxHeight(event.nativeEvent.layout.height);
  }, []);

  /**
   * Sets the container's max height and opacity based on the
   * animation value, giving a vertical opening effect
   */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      maxHeight: animation.value,
      opacity: interpolate(animation.value, [0, containerMaxHeight], [0, 1]),
    };
  });

  return (
    <View style={styles.container} onLayout={handleOnContainerLayout}>
      <Animated.View style={[styles.crewSelectionContainer, animatedStyles]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default AnimatedPanel;
