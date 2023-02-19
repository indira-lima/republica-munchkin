import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
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
  const zoomAnimation = useSharedValue(0);
  const openingAnimation = useSharedValue(0);
  const [containerMaxHeight, setContainerMaxHeight] = useState<number>(0);

  /**
   * Animate the open/close state change
   *
   * To get the actual available space for the container,
   * we need to listen to the onLayout event and change
   * the containerMaxHeight
   */
  useEffect(() => {
    console.log("panel open:", isPanelOPen);
    if (isPanelOPen) {
      zoomAnimation.value = withTiming(1, { duration: 200 }, () => {
        openingAnimation.value = withDelay(200, withTiming(containerMaxHeight));
      });
    } else {
      openingAnimation.value = withTiming(0, {}, async () => {
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
	 * Sets the panel scale based on the zoomAnimation value
	 * It gives the initial zoom in effect
	 */
	const panelZoomStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: zoomAnimation.value }],
		};
	});

  /**
   * Sets the container's max height based on the
   * openingAnimation value, giving a vertical opening effect
   */
  const panelHeightStyle = useAnimatedStyle(() => {
    return {
      maxHeight: openingAnimation.value,
    };
  });

  /**
   * Sets the opacity based on the openingAnimation value
   */
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(openingAnimation.value, [0, 600], [0, 1]),
    };
  });

  return (
    <View style={styles.container} onLayout={handleOnContainerLayout}>
      <Animated.View style={[styles.crewSelectionContainer, panelZoomStyle, panelHeightStyle]}>
        <Animated.View style={[opacityStyle]}>{children}</Animated.View>
      </Animated.View>
    </View>
  );
};

export default AnimatedPanel;
