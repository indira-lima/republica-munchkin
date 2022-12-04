import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import Avatar from "../PlayerAvatar";
import Gender from "../PlayerGender";
import PlayerLevelBars from "../PlayerLevelBars";
import StrengthCounter from "../PlayerStrengthCounter";
import ChangePlayerLevel from "../SwipeableActions/ChangePlayerLevel";

import styles, { themes } from "./styles";

const PanelPlayer = ({ player }) => {
  const theme = themes[player.theme] || themes.default;

  return (
    <ChangePlayerLevel player={player}>
      <View style={styles.container}>
        <FastImage source={theme.frame} style={styles.frame} />
        <View style={styles.content}>
          <Avatar player={player} theme={theme} />
          <View style={styles.nameAndLevel}>
            <Text style={styles.name}>{player.name}</Text>
            <StrengthCounter player={player} theme={theme} />
            <PlayerLevelBars player={player} theme={theme} />
          </View>
          <Gender player={player} theme={theme} />
        </View>
      </View>
    </ChangePlayerLevel>
  );
};

export default PanelPlayer;
