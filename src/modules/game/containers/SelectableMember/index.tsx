import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CrewMember } from "../../../core/definitions";

// @ts-ignore
import SelectableFrame from "../../../../../assets/frames/member_selectable.svg";
// @ts-ignore
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
} from "react-native-reanimated";

import styles from "./styles";
import AvatarImage from "../../../core/components/AvatarImage";

interface SelectableMemberProps {
  member: CrewMember;
}

/**
 * Component that shows the info of a crew member and let it
 * available for selection in the choosing-players game state
 *
 * TODO: Component style and member selection
 */
const SelectableMember: React.FunctionComponent<SelectableMemberProps> = ({
  member,
}) => {
  useEffect(() => {
    console.log("rendering:", member.name);
  }, []);

  return (
    <Animated.View entering={LightSpeedInLeft} exiting={LightSpeedOutLeft}>
      <View style={styles.container}>
        <SelectableFrame
          width={styles.frame.width}
          height={styles.frame.height}
          style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
          primaryColor={member.theme.colors.primary}
          secondaryColor={member.theme.colors.secondary}
        />
        <View style={styles.content}>
          <View style={styles.avatarSection}>
            <AvatarImage
              index={member.avatar}
              width={styles.avatarImage.width}
              height={styles.avatarImage.height}
              borderColor={member.theme.colors.secondary}
            />
          </View>
          <View>
            <Text style={styles.name}>{member.name}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SelectableMember;
