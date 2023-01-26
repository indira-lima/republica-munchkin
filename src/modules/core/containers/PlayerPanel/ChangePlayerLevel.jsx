import { useRef } from "react";

import imgLevelDown from "../../../../../assets/level-down.png";
import imgLevelUp from "../../../../../assets/level-up.png";
import useGame from "../../hooks/useGame";
import HorizontalSwipeableActions from "../../../core/components/SwipeableActions/Horizontal";

const ChangePlayerLevel = ({ children, player }) => {
  const { levelUpPlayer, levelDownPlayer } = useGame();
  const swipeableRef = useRef(null);

  return (
    <HorizontalSwipeableActions
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
