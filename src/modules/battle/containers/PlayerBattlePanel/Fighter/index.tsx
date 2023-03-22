import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import AvatarImage from "../../../../core/components/AvatarImage";
import { Player } from "../../../../core/definitions";
import ChooseAlly from "../ChooseAlly";

import { GenderLabels } from "../../../../core/utils/static";
import globalStyles, {fonts} from "../../../../core/utils/styles";

import Animated, {
  FadeIn,
  FadeOut,
  FlipInEasyY,
  FlipOutEasyY,
} from "react-native-reanimated";
import ThemedSVG from "../../../../core/components/ThemedSVG";
import useInterval from "../../../../core/hooks/useInterval";
import { battleTheme } from "../../../../core/utils/themes";
import { useBattle } from "../../../contexts/BattleContext";
import { fightersSize } from "../styles";

// @ts-ignore
import CallAlly from "../../../../../../assets/icons/CallAlly.svg";

interface AvatarProps {
  player?: Player;
  isAlly?: boolean;
}

// default time to wait to go back to idle state after the first tap
const BACK_TO_IDLE_TIMEOUT = 2000;

/**
 * Fighter container
 *
 * Renders the player info that is important for the battle
 * If the fighter is the main fighter's ally and it's not yet set,
 * renders the ChooseAlly component for selecting the ally
 */
const Fighter: React.FunctionComponent<AvatarProps> = ({ player, isAlly }) => {
  // selection state: used if the fighter is an ally
  const [changeAllyState, setChangeAllyState] = useState<"idle" | "change">(
    "idle"
  );
  const [resetChangeAllyTimeout, setResetChangeAllyTimeout] = useState<
    number | null
  >(null);

  const { setAllyPlayer } = useBattle();

  /**
   * Set up a react interval that changes the change ally state
   * back to false
   *
   * To activate the interval, set a timeout in ms
   */
  useInterval(() => {
    setChangeAllyState("idle");
    setResetChangeAllyTimeout(null);
  }, resetChangeAllyTimeout);

  /**
   * Cycle the change ally state trough idle and ready,
   * removing the ally when ready
   */
  const handleChangeAlly = useCallback(() => {
    if (!isAlly) return;

    if (changeAllyState === "idle") {
      setChangeAllyState("change");
      setResetChangeAllyTimeout(BACK_TO_IDLE_TIMEOUT);

      return;
    }

    setChangeAllyState("idle");
    setAllyPlayer(undefined);
  }, [changeAllyState, isAlly]);

  return (
    <View style={styles.container}>
      {isAlly && !player && <ChooseAlly />}
      {player && (
        <TouchableWithoutFeedback onPress={handleChangeAlly}>
          <View>
            {changeAllyState === "idle" && (
              <Animated.View entering={FlipInEasyY} exiting={FlipOutEasyY}>
                <AvatarImage
                  width={fightersSize}
                  height={fightersSize}
                  index={player!.memberInfo.avatar}
                  theme={battleTheme}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    lvl {player!.level} - {GenderLabels[player!.inGameGender]}
                  </Text>
                </View>
              </Animated.View>
            )}
            {changeAllyState === "change" && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <ThemedSVG
                  theme={battleTheme}
                  SVGImage={CallAlly}
                  width={fightersSize}
                  height={fightersSize}
                />
                <Text style={styles.infoText}>Remove Ally</Text>
              </Animated.View>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    marginTop: 2,
  },
  infoText: {
    ...globalStyles.text,
		fontSize: fonts.small,
  },
});

export default Fighter;
