import React, { useCallback } from "react";
import { Image, ImageSource } from "expo-image";

import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";
import styles from "./styles";

type DirectionConfig = {
  image: number | ImageSource | undefined;
  onOpen?: () => void;
  onPress?: () => void;
};

interface HorizontalSwipeableActionsProps {
  children: React.ReactNode;
  left?: DirectionConfig;
  right?: DirectionConfig;
}

/**
 * Interface to the Swipeable componenent by RN Gesture Handler
 * Can configure swipe actions for horizontal moving with a predefined layout
 * Just pass the image to show and the onPress callback for the desired swipe
 * direction
 */
const HorizontalSwipeableActions: React.FunctionComponent<HorizontalSwipeableActionsProps> =
  React.forwardRef<Swipeable, HorizontalSwipeableActionsProps>(
    ({ children, left, right }, swipeableRef) => {
      const renderLeftActions = useCallback(() => {
        if (!left) return;

        return (
          <RectButton
            style={[styles.swipeContainer, { flexDirection: "row-reverse" }]}
            onPress={left.onPress}
          >
            <Image source={left.image} style={styles.swipeIcon} />
          </RectButton>
        );
      }, [left]);

      const renderRightActions = useCallback(() => {
        if (!right) return;

        return (
          <RectButton
            style={[styles.swipeContainer, { flexDirection: "row-reverse" }]}
            onPress={right.onPress}
          >
            <Image source={right.image} style={styles.swipeIcon} />
          </RectButton>
        );
      }, [right]);

      return (
        <GestureHandlerRootView>
          <Swipeable
            ref={swipeableRef}
            friction={2}
            overshootLeft={false}
            overshootRight={false}
            onSwipeableLeftOpen={left?.onOpen}
            onSwipeableRightOpen={right?.onOpen}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
          >
            {children}
          </Swipeable>
        </GestureHandlerRootView>
      );
    }
  );

export default HorizontalSwipeableActions;
