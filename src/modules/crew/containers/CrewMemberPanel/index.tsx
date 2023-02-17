import { StyleSheet, View } from "react-native";

import CrewMemberAvatar from './Avatar';
import DeleteCrewMember from "./DeleteCrewMember";
import GenderRole from "./GenderRole";

// @ts-ignore
import FrameBg from "../../../../../assets/frame.svg";

import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { CrewMember } from "../../../core/definitions";
import Edition from "../../components/EditPlayerBtn";
import styles from "./styles";

interface CrewMemberPanelProps {
  crewMember: CrewMember;
}

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
          <FrameBg
            width={styles.frame.width}
            height={styles.frame.height}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            primaryColor={crewMember.theme.colors?.primary}
            secondaryColor={crewMember.theme.colors?.secondary}
          />
          <View style={styles.content}>
            <CrewMemberAvatar crewMember={crewMember} /> 
            <Edition crewMember={crewMember} />
            <GenderRole crewMember={crewMember} />
          </View>
        </View>
      </DeleteCrewMember>
    </Animated.View>
  );
};

export default CrewMemberPanel;