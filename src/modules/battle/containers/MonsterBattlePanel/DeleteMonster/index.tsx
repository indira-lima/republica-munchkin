import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ThemedSVG from "../../../../core/components/ThemedSVG";
import globalStyles from "../../../../core/utils/styles";
import { battleTheme } from "../../../../core/utils/themes";
import { useBattle } from "../../../contexts/BattleContext";
import { monstersSize } from "../styles";

// @ts-ignore
import DeleteMonsterSVG from "../../../../../../assets/icons/DeleteMonster.svg";

interface DeleteMonsterProps {
  index: number;
}

/**
 * Delete a monster from the list
 */
const DeleteMonster: React.FunctionComponent<DeleteMonsterProps> = ({
  index,
}) => {
  const { deleteMonster } = useBattle();

  return (
    <TouchableOpacity onPress={() => deleteMonster(index)}>
      <Text style={globalStyles.textSmall}> </Text>
      <ThemedSVG
        height={monstersSize}
        width={monstersSize}
        SVGImage={DeleteMonsterSVG}
        theme={battleTheme}
      />
      <Text style={globalStyles.textSmall}>Delete</Text>
    </TouchableOpacity>
  );
};

export default React.memo(DeleteMonster);
