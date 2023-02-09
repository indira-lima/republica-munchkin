import { useRef } from "react";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/trash.pn... Remove this comment to see the full error message
import imgTrash from "../../../../../assets/trash.png";
import useGame from "../../hooks/useGame";
import HorizontalSwipeableActions from "../../../core/components/SwipeableActions/Horizontal";

const ChangePlayerLevel = ({
  children,
  player
}: any) => {
  const { removePlayer } = useGame();
  const swipeableRef = useRef(null);

  return (
    <HorizontalSwipeableActions
			// @ts-ignore
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
