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
 * TODO: PlayerBattlePanel documentation
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
        {/* TODO: components for the battling player: modifiers, avatar, gender etc */}
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
