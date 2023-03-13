import React from "react";
import { StyleSheet, View } from "react-native";
import { Player } from "../../../core/definitions";

// @ts-ignore
import BattleContainerPlayer from "../../../../../assets/frames/BattleContainerPlayer.svg";
import styles, { frameHeight, frameWidth } from "./styles";

interface PlayerBattlePanelProps {
  player: Player;
}

/**
 * PlayerBattlePanel documentation
 */
const PlayerBattlePanel: React.FunctionComponent<PlayerBattlePanelProps> = ({
  player,
}) => {
  return (
    <View style={styles.container}>
      <BattleContainerPlayer
        width={frameWidth}
        height={frameHeight}
        style={[
          StyleSheet.absoluteFillObject,
        ]}
      />
    </View>
  );
};

export default PlayerBattlePanel;
