import {useCallback, useRef} from "react";
import FastImage from "react-native-fast-image";
import {RectButton} from "react-native-gesture-handler";

import imgLevelDown from "../../../assets/level-down.png";
import imgLevelUp from "../../../assets/level-up.png";
import useGame from "../../Hooks/useGame";
import SwipeableActions from "../SwipeableActions";
import styles from "./styles";

const ChangePlayerLevel = ({ children, player }) => {
  const { levelUpPlayer, levelDownPlayer } = useGame();

  const swipeableRef = useRef(null);

  const renderLeftActions = useCallback(() => {
    return (
      <RectButton
        style={[styles.swipeContainer, { flexDirection: "row-reverse" }]}
        onPress={() => levelDownPlayer(player.id)}
      >
        <FastImage source={imgLevelDown} style={styles.swipeIcon} />
      </RectButton>
    );
  }, [levelUpPlayer]);

  const renderRightActions = useCallback(() => {
    return (
      <RectButton
        style={[styles.swipeContainer, { flexDirection: "row" }]}
        onPress={() => levelUpPlayer(player.id)}
      >
        <FastImage source={imgLevelUp} style={styles.swipeIcon} />
      </RectButton>
    );
  }, [levelDownPlayer]);

  return (
    <SwipeableActions
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </SwipeableActions>
  );
};

export default ChangePlayerLevel;
