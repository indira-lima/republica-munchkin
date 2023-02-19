import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import Animated, {
  FlipInEasyY,
  FlipOutEasyY,
} from "react-native-reanimated";

import { CrewMember } from "../../../../core/definitions";
import avatarImages from "../../../../core/imports/avatars";
import globalStyles, { circulo, colors } from "../../../../core/utils/styles";

// @ts-ignore
import FastImage from "react-native-fast-image";

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
   * Gets the avatar image source and index in the `avatarImages` list
   * from the player's avatar
   * If the source is not found, gets the first one in the list
   */
  const [avatarSource, currentAvatarIndex] = useMemo(() => {
    const avatar = avatarImages[crewMember?.avatar!];
    const source = avatar || avatarImages[0];
    const index = avatarImages.findIndex((img) => img === source);

    return [source, index];
  }, [crewMember]);

  /**
   * Changes the avatar to the previous one in the `avatarImages` list
   *
   * Emit the onChange event passing the index of the previous avatar
   * in the list from the current defined avatar
   */
  const handlePrevAvatar = useCallback(() => {
    if (!enableEdit) return;

    let newAvatarIndex;
    if (currentAvatarIndex === 0) {
      newAvatarIndex = avatarImages.length - 1;
    } else {
      newAvatarIndex = currentAvatarIndex - 1;
    }

    onChange(newAvatarIndex);
  }, [currentAvatarIndex]);

  /**
   * Changes the avatar to the next one in the `avatarImages` list
   *
   * Emit the onChange event passing the index of the next avatar
   * in the list from the current defined avatar
   */
  const handleNextAvatar = useCallback(() => {
    if (!enableEdit) return;

    let newAvatarIndex;

    if (currentAvatarIndex === avatarImages.length - 1) {
      newAvatarIndex = 0;
    } else {
      newAvatarIndex = currentAvatarIndex + 1;
    }

    onChange(newAvatarIndex);
  }, [currentAvatarIndex]);

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
          <FastImage
            source={avatarSource}
            style={[
              styles.avatarImage,
              { borderColor: crewMember?.theme?.colors?.primary },
            ]}
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
    ...circulo(avatarSize),
    borderWidth: 3,
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
