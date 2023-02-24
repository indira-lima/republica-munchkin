import { StyleSheet, View } from "react-native";

import InGameValues from "../../components/player/InGameValues";
import Avatar from "./Avatar";
import ChangePlayerLevel from "./ChangePlayerLevel";
import InGameGender from "./InGameGender";

// @ts-ignore
import FrameBg from "../../../../../assets/frames/frame.svg";

import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import styles from "./styles";
import { Player } from "../../../core/definitions";

interface PlayerPanelProps {
  player: Player;
  enableEdit?: boolean;
}

/**
 * Main panel used for showing player information in the Players
 * and Game screens
 * Some components are rendered dependent on the enableEdit prop
 */
const PlayerPanel: React.FunctionComponent<PlayerPanelProps> = ({ player }) => {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
      <ChangePlayerLevel player={player}>
        <View style={styles.container}>
          <FrameBg
            width={styles.frame.width}
            height={styles.frame.height}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            primaryColor={player.memberInfo.theme.colors.primary}
            secondaryColor={player.memberInfo.theme.colors.secondary}
          />
          <View style={styles.content}>
            <Avatar player={player} />
            <InGameValues player={player} />
            <InGameGender player={player} />
          </View>
        </View>
      </ChangePlayerLevel>
    </Animated.View>
  );
};

export default PlayerPanel;
