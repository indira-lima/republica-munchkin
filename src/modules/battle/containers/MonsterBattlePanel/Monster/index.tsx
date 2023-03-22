import React from "react";
import { View } from "react-native";

import { monstersSize } from "../styles";
import { Monster as IMonster } from "../../../definitions";

import MonsterAvatar from "../../../components/MonsterAvatar";

interface MonsterProps {
  info: IMonster;
}

/**
 * Component for showing the monster's avatar and a touchable that
 * opens a configuration modal for setting it's info, like levels
 * and treasures earned after winning
 */
const Monster: React.FunctionComponent<MonsterProps> = ({ info }) => {
  return (
    <View>
      <MonsterAvatar
        height={monstersSize}
        width={monstersSize}
        index={info.avatar}
      />
    </View>
  );
};

export default Monster;
