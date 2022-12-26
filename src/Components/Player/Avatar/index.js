import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";

import globalStyles, { circulo } from "../../../Utils/styles";

import avatarImages, { lastAvatarIndex } from "./avatars";

const PlayerAvatar = ({
  player,
  theme,
  enableEdit = false,
  onChange = () => {},
}) => {
  const [avatarSource, currentAvatarIndex] = useMemo(() => {
    const avatar = avatarImages[player?.avatar];
    const source = avatar || avatarImages.avatar_0;
    const index = Object.entries(avatarImages).findIndex(
      ([, img]) => img === source
    );

    return [source, index];
  }, [player]);

  const handlePrevAvatar = useCallback(() => {
    if (!enableEdit) return;

    let newAvatarIndex;
    if (currentAvatarIndex === 0) {
      newAvatarIndex = lastAvatarIndex;
    } else {
      newAvatarIndex = currentAvatarIndex - 1;
    }

    onChange(`avatar_${newAvatarIndex}`);
  }, [currentAvatarIndex]);

  const handleNextAvatar = useCallback(() => {
    if (!enableEdit) return;

    let newAvatarIndex;

    if (currentAvatarIndex === lastAvatarIndex) {
      newAvatarIndex = 0;
    } else {
      newAvatarIndex = currentAvatarIndex + 1;
    }

    onChange(`avatar_${newAvatarIndex}`);
  }, [currentAvatarIndex]);

  return (
    <View style={styles.container}>
      {enableEdit && (
        <TouchableWithoutFeedback onPress={handlePrevAvatar}>
          <MaterialCommunityIcons color="#fff" name="chevron-left" size={24} />
        </TouchableWithoutFeedback>
      )}
      <FastImage
        source={avatarSource}
        style={[styles.avatarImage, { borderColor: theme.colors.primary }]}
      />
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
  container: {
    ...globalStyles.row,
  },
});

export default PlayerAvatar;
