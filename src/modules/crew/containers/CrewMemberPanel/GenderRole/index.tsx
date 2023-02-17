import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";
import useCrew from "../../../../core/hooks/useCrew";
import { Genders } from "../../../../core/utils/static";

import { CrewMember } from "../../../../core/definitions"; 
import genderIcons from "../../../../core/imports/genders";
import { circulo } from "../../../../core/utils/styles";

/**
 * Very similar to the ChangeGenderBtn, but it's a circle
 * I'm gonna refactor this later
 */
const CrewMemberGender = ({ crewMember }: { crewMember: CrewMember }) => {
  const { editCrewMember } = useCrew();

  /**
   * Gets the icon source and index from the player.gender value
   */
  const [genderImgSource, currentGenderIndex] = useMemo(() => {
		console.log('from gender:', crewMember);

    const source = genderIcons[crewMember.gender]
    const index = Object.entries(genderIcons).findIndex(
      ([, img]) => img === source
    );

    return [source, index];
  }, [crewMember?.gender]);

  /**
   * Changes the current gender value to the next one in the Genders list
   */
  const handleChangeGender = useCallback(() => {
    if (!crewMember.id) return;

    let newGenderIndex;
    if (currentGenderIndex === Object.keys(Genders).length - 1) {
      newGenderIndex = 0;
    } else {
      newGenderIndex = currentGenderIndex + 1;
    }

    editCrewMember(crewMember.id, { ...crewMember, gender: newGenderIndex });
  }, [crewMember, currentGenderIndex]);

  return (
    <TouchableWithoutFeedback onPress={handleChangeGender}>
      <View
        style={[
          styles.container,
          { borderColor: crewMember?.theme?.colors?.primary },
        ]}
      >
        <FastImage source={genderImgSource} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const containerSize = 78;

const styles = StyleSheet.create({
  container: {
    ...circulo(containerSize),
    borderWidth: 3,
  },
  image: {
    height: containerSize * 0.6,
    width: containerSize * 0.6,
  },
});

export default CrewMemberGender;
