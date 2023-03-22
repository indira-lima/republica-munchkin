import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Player } from "../../../core/definitions";
import globalStyles, { circulo } from "../../../core/utils/styles";

// @ts-ignore
import BattleReady from "../../../../../assets/icons/BattleReady.svg";
import AvatarImage from "../../../core/components/AvatarImage";
import ThemedSVG from "../../../core/components/ThemedSVG";
import DoubleTapButton from "../../../core/containers/DoubleTapButton";

interface PlayerAvatarProps {
  player: Player;
  enableEdit?: boolean;
  onChange?: (newAvatarIndex: number) => void;
}

/**
 * Component used to show the player's avatar image
 * It can take the player to the Battle screen if
 * edition is not enabled
 */
const PlayerAvatar: React.FunctionComponent<PlayerAvatarProps> = ({
  player,
}) => {
  const navigation = useNavigation();

  /**
   * Redirects to Battle screen
   * Called after the second tap at the DoubleTapButton
   */
  const onConfirmBattle = useCallback(() => {
    // @ts-ignore
    navigation.navigate("Battle", { player });
  }, [navigation, player]);

  return (
    <View style={styles.container}>
      <DoubleTapButton
        idleChildren={
          <AvatarImage
            index={player.memberInfo.avatar}
            width={avatarSize}
            height={avatarSize}
            theme={player.memberInfo.theme}
          />
        }
        confirmChildren={
          <ThemedSVG
            theme={player.memberInfo.theme}
            SVGImage={BattleReady}
            width={avatarSize}
            height={avatarSize}
          />
        }
        onConfirm={onConfirmBattle}
      />
    </View>
  );
};

const avatarSize = 78;

const styles = StyleSheet.create({
  battleImageWrapper: {
    ...circulo(avatarSize),
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
