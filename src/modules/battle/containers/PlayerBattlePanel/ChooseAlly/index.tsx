import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

import Carousel from "react-native-reanimated-carousel";
import ThemedSVG from "../../../../core/components/ThemedSVG";
import AvatarImage from "../../../../core/components/AvatarImage";
import { Player } from "../../../../core/definitions";
import useGame from "../../../../core/hooks/useGame";
import useInterval from "../../../../core/hooks/useInterval";
import globalStyles from "../../../../core/utils/styles";
import { battleTheme } from "../../../../core/utils/themes";
import { useBattle } from "../../../contexts/BattleContext";
import { playerBattlePanelContentHeight, fightersSize } from "../styles";

// @ts-ignore
import CallAlly from "../../../../../../assets/icons/CallAlly.svg";

interface ChooseAllyProps {
  // TODO: Component props
}

// default time to wait to go back to idle state after stop
// scrolling the carousel
const BACK_TO_IDLE_TIMEOUT = 2000;

/**
 * ChooseAlly documentation
 */
const ChooseAlly: React.FunctionComponent<ChooseAllyProps> = () => {
  const { playerList } = useGame();
  const { mainPlayer, setAllyPlayer } = useBattle();

  // list of available allies, doesn't include the current main player of the battle
  const availableAllies = useMemo(
    () => playerList.filter((p) => p.id !== mainPlayer?.id),
    [playerList, mainPlayer]
  );

  // item that has been snapped in the carousel, for automatic selection
  // after leaving the carousel idling
  const [snappedIndex, setSnappedIndex] = useState<number>(0);

  const [isChoosing, setIsChoosing] = useState<boolean>(false);
  const [backToIdleTimeout, setBackToIdleTimeout] = useState<number | null>(
    null
  );

  /**
   * Set up a react interval that changes the battle state
   * back to idle and removes itself (setting the timout to null)
   *
   * To activate the interval, set a timeout in ms
   */
  useInterval(
    useCallback(() => {
      handleSelectAlly(availableAllies[snappedIndex]!);
      setIsChoosing(false);
      setBackToIdleTimeout(null);
    }, [snappedIndex]),
    backToIdleTimeout
  );

  const handleStartChoosing = useCallback(() => {
    setIsChoosing(true);
    setBackToIdleTimeout(BACK_TO_IDLE_TIMEOUT);
  }, []);

  const handleSelectAlly = useCallback((ally: Player) => {
    setAllyPlayer(ally);
    setIsChoosing(false);
  }, []);

  const RIGHT_OFFSET = -24;
  const animationStyle = useCallback(
    (value: number) => {
      "worklet";

      const translateY = interpolate(
        value,
        [-1, 0, 1],
        [-fightersSize, 0, fightersSize]
      );
      const right = interpolate(
        value,
        [-1, -0.2, 1],
        [RIGHT_OFFSET, 0, RIGHT_OFFSET]
      );
      return {
        transform: [{ translateY }],
        right,
      };
    },
    [RIGHT_OFFSET]
  );

  return (
    <Fragment>
      {!isChoosing && (
        <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
          <TouchableOpacity onPress={handleStartChoosing}>
            <ThemedSVG
              SVGImage={CallAlly}
              height={fightersSize}
              width={fightersSize}
              theme={battleTheme}
            />
          </TouchableOpacity>
          <Text style={globalStyles.text}>Help!</Text>
        </Animated.View>
      )}
      {isChoosing && (
        <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
          <Carousel
            loop
            vertical
            style={{
              justifyContent: "center",
              width: fightersSize,
              height: playerBattlePanelContentHeight * 0.9,
              borderRadius: 24,
            }}
            pagingEnabled={false}
            width={fightersSize}
            height={fightersSize}
            customAnimation={animationStyle}
            data={availableAllies}
            onScrollEnd={() => setBackToIdleTimeout(BACK_TO_IDLE_TIMEOUT)}
            onScrollBegin={() => setBackToIdleTimeout(null)}
            onSnapToItem={(index) => setSnappedIndex(index)}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleSelectAlly(item)}>
                <AvatarImage
                  key={index}
                  width={fightersSize}
                  height={fightersSize}
                  theme={item.memberInfo.theme}
                  index={item.memberInfo.avatar}
                />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </Fragment>
  );
};

export default ChooseAlly;
