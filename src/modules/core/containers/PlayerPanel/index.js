import { useMemo } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

import ChangePlayerLevel from "./ChangePlayerLevel";
import Avatar from "./Avatar";
import GenderRole from "./GenderRole";
import Edition from "../../../players/components/EditPlayerBtn";
import InGameValues from "../../../game/components/player/InGameValues";

import themes from "../../utils/themes";
import styles from "./styles";

const PlayerPanel = ({ player, enableEdit = false }) => {
  const theme = themes[player.theme] || themes[0];
  const playerThemeProps = { player, theme };

  const Container = useMemo(
    () => (enableEdit ? View : ChangePlayerLevel),
    [enableEdit]
  );
  const MiddleContent = useMemo(
    () => (enableEdit ? Edition : InGameValues),
    [enableEdit]
  );

  return (
    <Container {...playerThemeProps}>
      <View style={styles.container}>
        <FastImage source={theme.frame} style={styles.frame} />
        <View style={styles.content}>
          <Avatar {...playerThemeProps} />
          <MiddleContent {...playerThemeProps} />
          <GenderRole {...playerThemeProps} />
        </View>
      </View>
    </Container>
  );
};

export default PlayerPanel;
