import React from "react";
import { StyleSheet, View } from "react-native";

import styles, { frameHeight, frameWidth } from "./styles";
import { useBattle } from "../../contexts/BattleContext";

// @ts-ignore
import BattleContainerMonster from "../../../../../assets/frames/BattleContainerMonster.svg";

import { Monster as IMonster } from "../../definitions";
import MonsterInfo from "./MonsterInfo";
import CallMonster from "./CallMonster";
import DeleteMonster from "./DeleteMonster";
import ChangeMonsterMofifiers from "./ChangeModifiers";

interface MonsterBattlePanelProps {
  monster: IMonster;
  index: number;
}

/**
 * Battle panel for showing a monster's info
 */
const MonsterBattlePanel: React.FunctionComponent<MonsterBattlePanelProps> = ({
  monster,
  index,
}) => {
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
        <View style={{ flex: 1 }}>
					<ChangeMonsterMofifiers />
				</View>
        {index === 0 ? <CallMonster /> : <DeleteMonster index={index} />}
      </View>
    </View>
  );
};

export default MonsterBattlePanel;
