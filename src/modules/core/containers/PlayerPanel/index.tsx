import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import InGameValues from "../../../game/components/player/InGameValues";
import Edition from "../../../players/components/EditPlayerBtn";
import Avatar from "./Avatar";
import ChangePlayerLevel from "./ChangePlayerLevel";
import DeletePlayer from "./DeletePlayer";
import GenderRole from "./GenderRole";

// @ts-ignore
import FrameBg from "../../../../../assets/frame.svg";

import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { Player } from "../../definitions";
import themes from "../../utils/themes";
import styles from "./styles";

interface PlayerPanelProps {
  player: Player;
  enableEdit?: boolean;
}

/**
 * Main panel used for showing player information in the Players
 * and Game screens
 * Some components are rendered dependent on the enableEdit prop
 */
const PlayerPanel: React.FunctionComponent<PlayerPanelProps> = ({
  player,
  enableEdit = false,
}) => {
  // gets the theme from the playerData
  const theme = useMemo(() => {
    if (player?.theme) {
      return themes.find((t) => t.name === player.theme?.name);
    }
    return themes[0];
  }, [player]);

  const Container = useMemo(
    () => (enableEdit ? DeletePlayer : ChangePlayerLevel),
    [enableEdit]
  );
  const MiddleContent = useMemo(
    () => (enableEdit ? Edition : InGameValues),
    [enableEdit]
  );

  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
      <Container player={player}>
        <View style={styles.container}>
          <FrameBg
            width={styles.frame.width}
            height={styles.frame.height}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            primaryColor={theme?.colors?.primary}
            secondaryColor={theme?.colors?.secondary}
          />
          <View style={styles.content}>
            <Avatar player={player} />
            <MiddleContent player={player} />
            <GenderRole player={player} />
          </View>
        </View>
      </Container>
    </Animated.View>
  );
};

export default PlayerPanel;
