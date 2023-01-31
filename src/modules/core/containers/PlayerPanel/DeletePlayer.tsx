import { useRef } from "react";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/trash.pn... Remove this comment to see the full error message
import imgTrash from "../../../../../assets/trash.png";
import useGame from "../../hooks/useGame";
import HorizontalSwipeableActions from "../../../core/components/SwipeableActions/Horizontal";

const ChangePlayerLevel = ({
  children,
  player
}: any) => {
  // @ts-expect-error TS(2339): Property 'removePlayer' does not exist on type '{}... Remove this comment to see the full error message
  const { removePlayer } = useGame();
  const swipeableRef = useRef(null);

  return (
    <HorizontalSwipeableActions
      ref={swipeableRef}
      left={{
        image: imgTrash,
        onPress: () => removePlayer(player.id),
      }}
    >
      {children}
    </HorizontalSwipeableActions>
  );
};

export default ChangePlayerLevel;
