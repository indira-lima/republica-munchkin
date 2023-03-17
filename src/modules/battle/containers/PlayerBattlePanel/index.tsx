import React from "react";
import { StyleSheet, View } from "react-native";

// @ts-ignore
import BattleContainerPlayer from "../../../../../assets/frames/BattleContainerPlayer.svg";
import styles, { frameHeight, frameWidth } from "./styles";
import Fighter from "./Fighter";
import { useBattle } from "../../contexts/BattleContext";
import ChangePlayerMofifiers from "./ChangeModifiers";

interface PlayerBattlePanelProps {}

/**
 * Battle panel for showing the main player and it's
 * possible ally
 * At the center of the panel there's the ChangeModifiers,
 * which is used to sum/subtract battle points to the player
 * group
 */
const PlayerBattlePanel: React.FunctionComponent<
  PlayerBattlePanelProps
> = ({}) => {
  const { battleState, mainPlayer, allyPlayer } = useBattle();

  if (battleState === "void") return null;

  return (
    <View style={styles.container}>
      <BattleContainerPlayer
        width={frameWidth}
        height={frameHeight}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.content}>
        <Fighter player={mainPlayer!} />
        <View style={{ flex: 1 }}>
          <ChangePlayerMofifiers />
        </View>
        <Fighter player={allyPlayer} isAlly />
      </View>
    </View>
  );
};

export default PlayerBattlePanel;
