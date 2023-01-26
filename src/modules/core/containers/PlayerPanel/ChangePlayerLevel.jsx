import {useRef} from "react";

import imgLevelDown from "../../../assets/level-down.png";
import imgLevelUp from "../../../assets/level-up.png";
import useGame from "../../Hooks/useGame";
import HorizontalSwipeableActions from "../../SwipeableActions/Horizontal.jsx";

const ChangePlayerLevel = ({ children, player }) => {
  const { levelUpPlayer, levelDownPlayer } = useGame();
  const swipeableRef = useRef(null);

  return (
    <HorizontalSwipeableActions
      ref={swipeableRef}
      left={
        {
          icon: imgLevelDown,
          onPress: () => levelDownPlayer(player.id)
        }
      }
      right={
        {
          icon: imgLevelUp,
          onPress: () => levelUpPlayer(player.id)
        }
      }
    >
      {children}
    </HorizontalSwipeableActions>
  );
};

export default ChangePlayerLevel;
