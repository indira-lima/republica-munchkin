import { StyleSheet, View } from "react-native";

import InGameValues from "../../components/player/InGameValues";
import Avatar from "./Avatar";
import ChangePlayerLevel from "./ChangePlayerLevel";
import InGameGender from "../InGameGender";

// @ts-ignore
import FrameBg from "../../../../../assets/frames/frame.svg";

import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { Player } from "../../../core/definitions";
import styles, { frameHeight, frameWidth } from "./styles";
import ThemedSVG from "../../../core/components/ThemedSVG";

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
          <ThemedSVG
            SVGImage={FrameBg}
            width={frameWidth}
            height={frameHeight}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            theme={player.memberInfo.theme}
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
