import { useRef } from "react";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/level-do... Remove this comment to see the full error message
import imgLevelDown from "../../../../../assets/level-down.png";
// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/level-up... Remove this comment to see the full error message
import imgLevelUp from "../../../../../assets/level-up.png";
import useGame from "../../hooks/useGame";
import HorizontalSwipeableActions from "../../../core/components/SwipeableActions/Horizontal";

const ChangePlayerLevel = ({
  children,
  player
}: any) => {
  // @ts-expect-error TS(2339): Property 'levelUpPlayer' does not exist on type '{... Remove this comment to see the full error message
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
