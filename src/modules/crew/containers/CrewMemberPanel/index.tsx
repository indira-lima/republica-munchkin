import { StyleSheet, View } from "react-native";

import CrewMemberAvatar from "../Avatar";
import DeleteCrewMember from "./DeleteCrewMember";
import CrewMemberGender from "../GenderRole";

// @ts-ignore
import FrameBg from "../../../../../assets/frames/frame.svg";

import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { CrewMember } from "../../../core/definitions";
import Edition from "../../components/EditionButton";
import styles from "./styles";
import ThemedSVG from "../../../core/components/ThemedSVG";
import Name from "../../../core/components/Player/Name";

interface CrewMemberPanelProps {
  crewMember: CrewMember;
}

const iconsSize = 78;

/**
 * Main panel used for showing a member information in the Crew screen
 */
const CrewMemberPanel: React.FunctionComponent<CrewMemberPanelProps> = ({
  crewMember,
}) => {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
      <DeleteCrewMember crewMember={crewMember}>
        <View style={styles.container}>
          <ThemedSVG
            SVGImage={FrameBg}
            width={styles.frame.width}
            height={styles.frame.height}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            theme={crewMember.theme}
          />
          <View style={styles.content}>
            <CrewMemberAvatar
              crewMember={crewMember}
              height={iconsSize}
              width={iconsSize}
            />
            <View style={styles.middleContent}>
              <Name text={crewMember.name} />
              <Edition crewMember={crewMember} />
            </View>
            <CrewMemberGender
              crewMember={crewMember}
              height={iconsSize}
              width={iconsSize}
            />
          </View>
        </View>
      </DeleteCrewMember>
    </Animated.View>
  );
};

export default CrewMemberPanel;
