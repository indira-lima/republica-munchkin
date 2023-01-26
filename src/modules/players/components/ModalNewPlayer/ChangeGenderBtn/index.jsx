import { useCallback, useMemo } from "react";

import Button from "../../../../core/components/Button";
import { Genders } from "../../../../core/utils/static";
import genderIcons from "../../../../core/imports/genders";

/**
 * Button to change the player's gender
 * Should receive a onChange function that handles changes in the gender value
 */
const ChangeGenderBtn = ({ player, onChange = () => {}, theme }) => {

	/**
	 * Gets the icon source and index from the player.gender value
	 */
  const [genderImgSource, currentGenderIndex] = useMemo(() => {
    const source = genderIcons[player?.gender] || genderIcons[Genders.PAN];
    const index = Object.entries(genderIcons).findIndex(([, img]) => img === source);

    return [source, index];
  }, [player?.gender]);

	/**
	 * Changes the current gender value to the next one in the Genders list
	 */
  const handleChangeGender = useCallback(() => {
		let newGenderIndex
		if (currentGenderIndex === Object.keys(Genders).length - 1) {
			newGenderIndex = 0
		} else {
			newGenderIndex = currentGenderIndex + 1
		}
		
		onChange(newGenderIndex)
	}, [currentGenderIndex]);

  return (
    <Button
      type="hexagon"
      theme={theme?.name}
      icon={genderImgSource}
      onPress={handleChangeGender}
    />
  );
};

export default ChangeGenderBtn;
