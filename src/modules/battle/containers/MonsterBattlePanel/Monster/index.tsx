import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { monstersSize } from "../styles";
import { Monster as IMonster } from "../../../definitions";

import MonsterAvatar from "../../../components/MonsterAvatar";
import globalStyles, {fonts} from "../../../../core/utils/styles";
import {battleTheme} from "../../../../core/utils/themes";

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
			<Text style={styles.infoText}>{info.levels} level{info.levels === 1 ? '' : 's'}</Text>
      <MonsterAvatar
				theme={battleTheme}
        height={monstersSize}
        width={monstersSize}
        index={info.avatar}
      />
			<Text style={styles.infoText}>{info.treasures} treasure{info.treasures === 1 ? '' : 's'}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	infoText: {
		...globalStyles.text,
		fontSize: fonts.small,
	}
});

export default Monster;
