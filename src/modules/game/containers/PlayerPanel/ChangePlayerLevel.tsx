import { createRef } from "react";

// @ts-ignore
import imgLevelDown from "../../../../../assets/icons/level-down.png";
// @ts-ignore
import imgLevelUp from "../../../../../assets/icons/level-up.png";

import useGame from "../../../core/hooks/useGame";
import HorizontalSwipeableActions from "../../../core/components/SwipeableActions/Horizontal";
import { Swipeable } from "react-native-gesture-handler";

const ChangePlayerLevel = ({ children, player }: any) => {
  const { levelUpPlayer, levelDownPlayer } = useGame();
  const swipeableRef = createRef<Swipeable>();

  return (
    <HorizontalSwipeableActions
			// @ts-ignore
      ref={swipeableRef}
      left={{
        image: imgLevelDown,
        onPress: () => levelDownPlayer(player.id),
      }}
      right={{
        image: imgLevelUp,
        onPress: () => levelUpPlayer(player.id),
      }}
    >
      {children}
    </HorizontalSwipeableActions>
  );
};

export default ChangePlayerLevel;
