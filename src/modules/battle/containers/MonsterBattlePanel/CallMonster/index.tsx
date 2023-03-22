import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ThemedSVG from "../../../../core/components/ThemedSVG";
import globalStyles from "../../../../core/utils/styles";
import { useBattle } from "../../../contexts/BattleContext";
import { monstersSize } from "../styles";

// @ts-ignore
import CallMonsterSVG from "../../../../../../assets/icons/CallMonster.svg";
import { battleTheme } from "../../../../core/utils/themes";

interface CallMonsterProps {}

/**
 * CallMonster documentation
 */
const CallMonster: React.FunctionComponent<CallMonsterProps> = () => {
  const { addMonster } = useBattle();

  return (
    <TouchableOpacity onPress={() => addMonster()}>
      <Text style={globalStyles.textSmall}>{" "}</Text>
      <ThemedSVG
        height={monstersSize}
        width={monstersSize}
        SVGImage={CallMonsterSVG}
        theme={battleTheme}
      />
      <Text style={globalStyles.textSmall}>Help!</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CallMonster);
