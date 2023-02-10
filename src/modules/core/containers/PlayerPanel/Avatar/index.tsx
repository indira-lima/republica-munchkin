import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeOut,
  FlipInEasyY,
  FlipOutEasyY,
} from "react-native-reanimated";

import { Player } from "../../../definitions";
import avatarImages from "../../../imports/avatars";
import globalStyles, { circulo, colors } from "../../../utils/styles";

// @ts-ignore
import FastImage from "react-native-fast-image";
// @ts-ignore
import battleReady from "../../../../../../assets/battle_ready.png";
import useInterval from "../../../hooks/useInterval";

interface PlayerAvatarProps {
  player: Player;
  enableEdit?: boolean;
  onChange?: (newAvatarIndex: number) => void;
}

// default time to wait to go back to idle state after the first tap
const BACK_TO_IDLE_TIMEOUT = 2000;

/**
 * Component used to show the player's avatar image
 * It can cycle trough the available avatar images if
 * edition is enabled
 * It can take the player to the Battle screen if
 * edition is not enabled
 *
 * After creating a new context for the running game, this
 * component's logic should be separated into two files,
 * for the Players and Game screens
 * Each one will receive a different kind of player object
 */
const PlayerAvatar: React.FunctionComponent<PlayerAvatarProps> = ({
  player,
  enableEdit = false,
  onChange = () => {},
}) => {
  const navigation = useNavigation();

  /**
   * Gets the avatar image source and index in the `avatarImages` list
   * from the player's avatar
   * If the source is not found, gets the first one in the list
   */
  const [avatarSource, currentAvatarIndex] = useMemo(() => {
    const avatar = avatarImages[player?.avatar!];
    const source = avatar || avatarImages[0];
    const index = avatarImages.findIndex((img) => img === source);

    return [source, index];
  }, [player?.avatar]);

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

  // battle state: is the player ready for some action??
  const [battleState, setBattleState] = useState<"idle" | "ready">("idle");
  const [backToIdleTimeout, setBackToIdleTimeout] = useState<number | null>(
    null
  );

  /**
   * Set up a react interval that changes the battle state
   * back to idle and removes itself (setting the timout to null)
   *
   * To activate the interval, set a timeout in ms
   */
  useInterval(() => {
    setBattleState("idle");
    setBackToIdleTimeout(null);
  }, backToIdleTimeout);

  /**
   * Cycle the battle state trough idle and ready,
   * redirecting to Battle screen when ready
   */
  const handleBattleStateChange = useCallback(() => {
    if (enableEdit) return;

    if (battleState === "idle") {
      setBattleState("ready");
      setBackToIdleTimeout(BACK_TO_IDLE_TIMEOUT); // 2s timeout

      return;
    }
    // @ts-ignore
    navigation.navigate("Battle", { player });
    setBattleState("idle");
  }, [battleState, player, enableEdit]);

  return (
    <View style={styles.container}>
      {/* If edition is enabled, renders two buttons on the side to change the avatar */}
      {enableEdit && (
        <TouchableWithoutFeedback onPress={handlePrevAvatar}>
          <MaterialCommunityIcons color="#fff" name="chevron-left" size={24} />
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback onPress={handleBattleStateChange}>
        <View>
          {/* Idle means the the user hasn't tapped the avatat */}
          {battleState === "idle" && (
            <Animated.View entering={FlipInEasyY} exiting={FlipOutEasyY}>
              <FastImage
                source={avatarSource}
                style={[
                  styles.avatarImage,
                  { borderColor: player?.theme?.colors.primary },
                ]}
              />
            </Animated.View>
          )}
          {/* If the user does tap the avatar, the battle icon is shown, ready for battle */}
          {battleState === "ready" && (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.battleImageWrapper}
            >
              <FastImage
                resizeMode="contain"
                source={battleReady}
                style={styles.battleImage}
              />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
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

export default PlayerAvatar;
