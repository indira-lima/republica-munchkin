import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useBattle } from "../../contexts/BattleContext";
import { frameContentWidth } from "../PlayerBattlePanel/styles";
import styles, {modifierSize} from "./styles";

interface ChangePlayerMofifiersProps {
  // TODO: Component props
}

type TranslateModifier = {
  x: number;
  y: number;
};

const X_OFFSET = frameContentWidth * 0.05;
const Y_OFFSET = frameContentWidth * 0.02;

/**
 * ChangePlayerMofifiers documentation
 */
const ChangePlayerMofifiers: React.FunctionComponent<
  ChangePlayerMofifiersProps
> = () => {
  const { playerBattlePoints, addPlayerBattlePoints, resetPlayerModifiers } = useBattle();

  const handleModifier = useCallback((value: number) => {
    addPlayerBattlePoints(value);
  }, []);

  const renderModifierButton = useCallback(
    (label: string, value: number, { x, y }: TranslateModifier) => {
      const transform = { transform: [{ translateX: x }, { translateY: y }] };

      return (
        <TouchableOpacity
					activeOpacity={1}
          onPress={() => handleModifier(value)}
          style={[styles.modifierButton, transform]}
        >
          <Text style={styles.modifierText}>{label}</Text>
        </TouchableOpacity>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {renderModifierButton("+1", 1, { x: X_OFFSET, y: -Y_OFFSET })}
        {renderModifierButton("+3", 3, { x: 0, y: 0 })}
        {renderModifierButton("+5", 5, { x: X_OFFSET, y: Y_OFFSET })}
      </View>
      <View style={[styles.column, styles.mainConlumn]}>
        <Text style={styles.totalPoints} numberOfLines={1}>
          {playerBattlePoints}
        </Text>

				<TouchableOpacity onPress={resetPlayerModifiers} style={styles.resetButton}>
					<MaterialCommunityIcons name="reload" color="#fff" size={modifierSize} />
				</TouchableOpacity>
      </View>
      <View style={styles.column}>
        {renderModifierButton("-1", -1, { x: -X_OFFSET, y: -Y_OFFSET })}
        {renderModifierButton("-3", -3, { x: 0, y: 0 })}
        {renderModifierButton("-5", -5, { x: -X_OFFSET, y: Y_OFFSET })}
      </View>
    </View>
  );
};

export default ChangePlayerMofifiers;
