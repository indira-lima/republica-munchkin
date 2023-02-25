import { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import useGame from "../../../core/hooks/useGame";

import { Player } from "../../../core/definitions";
import GenderImage, {
  LAST_GENDER_INDEX,
} from "../../../core/components/GenderImage";

/**
 * Shows and changes the Player.inGameGender prop
 */
const InGameGender = ({ player }: { player: Player }) => {
  const { editPlayer } = useGame();

  /**
   * Changes the current gender value to the next one in the Genders list
   */
  const handleChangeGender = useCallback(() => {
    if (!player.id) return;

    let newGenderIndex;
    if (!player || player.inGameGender >= LAST_GENDER_INDEX) {
      newGenderIndex = 0;
    } else {
      newGenderIndex = player.inGameGender + 1;
    }

    editPlayer(player.id, {
      ...player,
      inGameGender: newGenderIndex,
    });
  }, [player]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleChangeGender}>
      <GenderImage
        width={imageSize}
        height={imageSize}
        theme={player?.memberInfo?.theme}
        index={player.inGameGender}
      />
    </TouchableOpacity>
  );
};

const imageSize = 78;

export default InGameGender;
