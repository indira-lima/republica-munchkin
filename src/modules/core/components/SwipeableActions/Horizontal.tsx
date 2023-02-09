import React, { useCallback } from "react";
import FastImage, { Source } from "react-native-fast-image";

import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";
import styles from "./styles";

type DirectionConfig = {
  image: number | Source | undefined;
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
          // @ts-expect-error TS(2322): Type '{ children: Element; style: ({ width: number... Remove this comment to see the full error message
          <RectButton
            style={[styles.swipeContainer, { flexDirection: "row-reverse" }]}
            onPress={left.onPress}
          >
            <FastImage source={left.image} style={styles.swipeIcon} />
          </RectButton>
        );
      }, [left]);

      const renderRightActions = useCallback(() => {
        if (!right) return;

        return (
          // @ts-expect-error TS(2322): Type '{ children: Element; style: ({ width: number... Remove this comment to see the full error message
          <RectButton
            style={[styles.swipeContainer, { flexDirection: "row-reverse" }]}
            onPress={right.onPress}
          >
            <FastImage source={right.image} style={styles.swipeIcon} />
          </RectButton>
        );
      }, [right]);

      return (
        <GestureHandlerRootView>
          {/* @ts-expect-error */}
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
