import React from "react";

import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const SwipeableActions = (
  { children, renderLeftActions, renderRightActions, onSwipeableLeftOpen, onSwipeableRightOpen },
  swipeableRef
) => {
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        overshootLeft={false}
        overshootRight={false}
        onSwipeableLeftOpen={onSwipeableLeftOpen}
        onSwipeableRightOpen={onSwipeableRightOpen}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default React.forwardRef(SwipeableActions);
