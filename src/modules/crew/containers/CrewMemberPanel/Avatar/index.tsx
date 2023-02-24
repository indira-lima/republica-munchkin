import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import Animated, { FlipInEasyY, FlipOutEasyY } from "react-native-reanimated";

import { CrewMember } from "../../../../core/definitions";
import globalStyles, { circulo, colors } from "../../../../core/utils/styles";

// @ts-ignore
import AvatarImage, {
  LAST_AVATAR_INDEX,
} from "../../../../core/components/AvatarImage";

interface CrewMemberAvatarProps {
  crewMember: CrewMember;
  enableEdit?: boolean;
  onChange?: (newAvatarIndex: number) => void;
}

/**
 * Component used to show the member's avatar image
 * It can cycle trough the available avatar images if
 * edition is enabled (within the new member modal)
 */
const CrewMemberAvatar: React.FunctionComponent<CrewMemberAvatarProps> = ({
  crewMember,
  enableEdit = false,
  onChange = () => {},
}) => {
  /**
   * Changes the avatar to the previous one in the `avatarImages` list
   *
   * Emit the onChange event passing the index of the previous avatar
   * in the list from the current defined avatar
   */
  const handlePrevAvatar = useCallback(() => {
    if (!enableEdit) return;

    let newAvatarIndex;
    if (!crewMember) {
      newAvatarIndex = 0;
    } else {
      if (crewMember?.avatar === 0) {
        newAvatarIndex = LAST_AVATAR_INDEX;
      } else {
        newAvatarIndex = crewMember.avatar - 1;
      }
    }

    onChange(newAvatarIndex);
  }, [crewMember?.avatar]);

  /**
   * Changes the avatar to the next one in the `avatarImages` list
   *
   * Emit the onChange event passing the index of the next avatar
   * in the list from the current defined avatar
   */
  const handleNextAvatar = useCallback(() => {
    if (!enableEdit) return;

    let newAvatarIndex;

    if (!crewMember) {
      newAvatarIndex = 0;
    } else {
      if (crewMember.avatar === LAST_AVATAR_INDEX) {
        newAvatarIndex = 0;
      } else {
        newAvatarIndex = crewMember.avatar + 1;
      }
    }

    onChange(newAvatarIndex);
  }, [crewMember?.avatar]);

  return (
    <View style={styles.container}>
      {/* If edition is enabled, renders two buttons on the side to change the avatar */}
      {enableEdit && (
        <TouchableWithoutFeedback onPress={handlePrevAvatar}>
          <MaterialCommunityIcons color="#fff" name="chevron-left" size={24} />
        </TouchableWithoutFeedback>
      )}
      <View>
        <Animated.View entering={FlipInEasyY} exiting={FlipOutEasyY}>
          <AvatarImage
            index={crewMember?.avatar!}
            width={styles.avatarImage.width}
            height={styles.avatarImage.height}
            borderColor={crewMember?.theme?.colors?.secondary}
          />
        </Animated.View>
      </View>
      {enableEdit && (
        <TouchableWithoutFeedback onPress={handleNextAvatar}>
          <MaterialCommunityIcons color="#fff" name="chevron-right" size={24} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const avatarSize = 78;

const styles = StyleSheet.create({
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
  },
  battleImageWrapper: {
    ...circulo(avatarSize),
    borderWidth: 3,
    backgroundColor: "transparent",
    borderColor: colors.accent,
  },
  battleImage: {
    width: 48,
    height: 48,
  },
  container: {
    ...globalStyles.row,
  },
});

export default CrewMemberAvatar;
