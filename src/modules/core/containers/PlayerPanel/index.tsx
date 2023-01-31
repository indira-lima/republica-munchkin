import { useMemo } from "react";
import { View, StyleSheet } from "react-native";

import ChangePlayerLevel from "./ChangePlayerLevel";
import DeletePlayer from "./DeletePlayer";
import Avatar from "./Avatar";
import GenderRole from "./GenderRole";
import Edition from "../../../players/components/EditPlayerBtn";
import InGameValues from "../../../game/components/player/InGameValues";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/frame.sv... Remove this comment to see the full error message
import FrameBg from "../../../../../assets/frame.svg";

import themes from "../../utils/themes";
import styles from "./styles";

const PlayerPanel = ({
  player,
  enableEdit = false
}: any) => {
  const theme = themes[player.theme] || themes[0];
  const playerThemeProps = { player, theme };

  const Container = useMemo(
    () => (enableEdit ? DeletePlayer : ChangePlayerLevel),
    [enableEdit]
  );
  const MiddleContent = useMemo(
    () => (enableEdit ? Edition : InGameValues),
    [enableEdit]
  );

  return (
    <Container {...playerThemeProps}>
      <View style={styles.container}>
				<FrameBg
            width={styles.frame.width}
            height={styles.frame.height}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            primaryColor={theme?.colors?.primary}
            secondaryColor={theme?.colors?.secondary}
				/>
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
