import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedSVG from "../../../../core/components/ThemedSVG";
import globalStyles, { fonts } from "../../../../core/utils/styles";
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
      <Text style={styles.text}>{" "}</Text>
      <ThemedSVG
        height={monstersSize}
        width={monstersSize}
        SVGImage={CallMonsterSVG}
        theme={battleTheme}
      />
      <Text style={styles.text}>Help!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text,
    fontSize: fonts.small,
  },
});

export default CallMonster;
