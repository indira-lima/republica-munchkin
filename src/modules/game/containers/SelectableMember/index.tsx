import React, { useEffect } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { CrewMember } from "../../../core/definitions";

// @ts-ignore
import SelectableFrame from "../../../../../assets/frames/frame_selectable.svg";
// @ts-ignore
import AvatarSelected from "../../../../../assets/avatars/AvatarSelected.svg";

import Animated, {
  FlipInYLeft,
  FlipOutYRight,
  LightSpeedInLeft,
  LightSpeedOutLeft,
} from "react-native-reanimated";

import AvatarImage from "../../../core/components/AvatarImage";
import styles from "./styles";

interface SelectableMemberProps {
  member: CrewMember;
  onPress: (crew: CrewMember) => void;
  isSelected: boolean;
}

/**
 * Component that shows the info of a crew member and let it
 * available for selection in the choosing-players game state
 *
 * TODO: Component style and member selection
 */
const SelectableMember: React.FunctionComponent<SelectableMemberProps> = ({
  member,
  onPress,
  isSelected,
}) => {
  useEffect(() => {
    console.log("rendering:", member.name);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => onPress(member)}>
      <Animated.View entering={LightSpeedInLeft} exiting={LightSpeedOutLeft}>
        <View style={styles.container}>
          <SelectableFrame
            width={styles.frame.width}
            height={styles.frame.height}
            style={[styles.frame, isSelected ? styles.selectedFrame : {}]}
            primaryColor={member.theme.colors.primary}
            secondaryColor={member.theme.colors.secondary}
          />
          <View style={styles.content}>
            <View style={styles.avatarSection}>
              {!isSelected && (
                <Animated.View entering={FlipInYLeft} exiting={FlipOutYRight}>
                  <AvatarImage
                    index={member.avatar}
                    width={styles.avatarImage.width}
                    height={styles.avatarImage.height}
                    borderColor={member.theme.colors.secondary}
                  />
                </Animated.View>
              )}
              {isSelected && (
                <Animated.View entering={FlipInYLeft} exiting={FlipOutYRight}>
                  <AvatarSelected
                    width={styles.avatarImage.width}
                    height={styles.avatarImage.height}
                    primaryColor={member.theme.colors.primary}
                    secondaryColor={member.theme.colors.secondary}
                  />
                </Animated.View>
              )}
            </View>
            <View>
              <Text style={styles.name}>{member.name}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SelectableMember;
