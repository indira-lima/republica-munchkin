import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import Avatar from "../Avatar";
import GenderRole from "../GenderRole";
import LevelIndicatorBars from "../LevelIndicatorBars";
import StrengthCounter from "../StrengthCounter";
import ChangePlayerLevel from "../../SwipeableActions/ChangePlayerLevel";

import styles, { themes } from "./styles";

const PanelPlayer = ({ player, enableEdit = false }) => {
  const theme = themes[player.theme] || themes.default;
	const playerThemeProps = { player, theme };

  return (
    <ChangePlayerLevel {...playerThemeProps} >
      <View style={styles.container}>
        <FastImage source={theme.frame} style={styles.frame} />
        <View style={styles.content}>
          <Avatar {...playerThemeProps} />
          <View style={styles.nameAndLevel}>
            <Text style={styles.name}>{player.name}</Text>
            <StrengthCounter {...playerThemeProps} />
            <LevelIndicatorBars {...playerThemeProps} />
          </View>
          <GenderRole {...playerThemeProps} />
        </View>
      </View>
    </ChangePlayerLevel>
  );
};

export default PanelPlayer;
