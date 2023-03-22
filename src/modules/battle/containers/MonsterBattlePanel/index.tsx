import React from "react";
import { StyleSheet, View } from "react-native";

import styles, { frameHeight, frameWidth } from "./styles";
import { useBattle } from "../../contexts/BattleContext";

// @ts-ignore
import BattleContainerMonster from "../../../../../assets/frames/BattleContainerMonster.svg";
import { Monster as IMonster } from "../../definitions";
import MonsterInfo from "./MonsterInfo";

interface MonsterBattlePanelProps {
  monster: IMonster;
}

/**
 * Battle panel for showing a monster's info
 */
const MonsterBattlePanel: React.FunctionComponent<
  MonsterBattlePanelProps
> = ({ monster }) => {
  const { battleState } = useBattle();

  if (battleState === "void") return null;

  return (
    <View style={styles.container}>
      <BattleContainerMonster
        width={frameWidth}
        height={frameHeight}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.content}>
        <MonsterInfo info={monster} />
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};

export default MonsterBattlePanel;
