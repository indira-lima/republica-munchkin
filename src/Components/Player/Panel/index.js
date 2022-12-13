import { View } from "react-native";
import FastImage from "react-native-fast-image";

import Avatar from "../Avatar";
import GenderRole from "../GenderRole";
import ChangePlayerLevel from "../../SwipeableActions/ChangePlayerLevel";

import styles, { themes } from "./styles";
import InGameValues from "../InGameValues";
import Edition from "../Edition";
import {useMemo} from "react";

const PanelPlayer = ({ player, enableEdit = false }) => {
  const theme = themes[player.theme] || themes.default;
  const playerThemeProps = { player, theme };

  const Container = useMemo(() => enableEdit ? View : ChangePlayerLevel, [enableEdit]);
  const MiddleContent = useMemo(() => enableEdit ? Edition : InGameValues, [enableEdit]);

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

export default PanelPlayer;
