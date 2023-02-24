import { useCallback } from "react";
import { TouchableWithoutFeedback } from "react-native";

import { CrewMember } from "../../../core/definitions";

import useCrew from "../../../core/hooks/useCrew";
import GenderImage, {
  LAST_GENDER_INDEX,
} from "../../../core/components/GenderImage";

/**
 * Changes the current CrewMember gender
 * It's different from the InGameGender, for it changes the CrewMember's
 * gender, while the InGameGender changes the Player's in-game gender
 */
const CrewMemberGender = ({
  crewMember,
  onChange,
	width,
	height,
}: {
  crewMember: CrewMember;
  onChange?: (newIndex: number) => void;
	width?: number;
	height?: number;
}) => {
  const { editCrewMember } = useCrew();

  /**
   * Changes the current gender value to the next one in the Genders list
   */
  const handleChangeGender = useCallback(() => {
    let newGenderIndex;
    if (!crewMember || crewMember.gender >= LAST_GENDER_INDEX) {
      newGenderIndex = 0;
    } else {
      newGenderIndex = crewMember.gender + 1;
    }

    if (typeof onChange === "function") {
      onChange(newGenderIndex);
    } else {
      editCrewMember(crewMember.id, { ...crewMember, gender: newGenderIndex });
    }
  }, [crewMember]);

  return (
    <TouchableWithoutFeedback onPress={handleChangeGender}>
      <GenderImage
        height={height!}
        width={width!}
        index={crewMember?.gender}
        theme={crewMember?.theme}
      />
    </TouchableWithoutFeedback>
  );
};

export default CrewMemberGender;
