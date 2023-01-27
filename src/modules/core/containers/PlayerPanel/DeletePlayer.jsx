import { useRef } from "react";

import imgTrash from "../../../../../assets/trash.png";
import useGame from "../../hooks/useGame";
import HorizontalSwipeableActions from "../../../core/components/SwipeableActions/Horizontal";

const ChangePlayerLevel = ({ children, player }) => {
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
