import { useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import useGame from "../../../core/hooks/useGame";
import { Genders } from "../../../core/utils/static";

import { Player } from "../../../core/definitions";
import genderIcons from "../../../core/imports/genders";
import GenderImage from "../../../core/components/GenderImage";

/**
 * Shows and changes the Player.inGameGender prop
 */
const InGameGender = ({ player }: { player: Player }) => {
  const { editPlayer } = useGame();

  /**
   * Gets the icon source and index from the player.gender value
   */
  const currentGenderIndex = useMemo(() => {
    const source =
      genderIcons[player?.inGameGender!] || genderIcons[Genders.PAN];
    const index = Object.entries(genderIcons).findIndex(
      ([, img]) => img === source
    );

    return index;
  }, [player?.inGameGender]);

  /**
   * Changes the current gender value to the next one in the Genders list
   */
  const handleChangeGender = useCallback(() => {
    if (!player.id) return;

    let newGenderIndex;
    if (currentGenderIndex === Object.keys(Genders).length - 1) {
      newGenderIndex = 0;
    } else {
      newGenderIndex = currentGenderIndex + 1;
    }

    editPlayer(player.id, {
      ...player,
      inGameGender: newGenderIndex,
    });
  }, [player, currentGenderIndex]);

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
