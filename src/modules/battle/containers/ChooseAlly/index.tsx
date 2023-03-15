import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import ThemedSVG from "../../../core/components/ThemedSVG";

// @ts-ignore
import CallAlly from "../../../../../assets/icons/CallAlly.svg";
import globalStyles from "../../../core/utils/styles";
import { battleTheme } from "../../../core/utils/themes";
import { iconsSize } from "../PlayerBattlePanel/styles";
import Animated, {
  interpolate,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import AvatarImage from "../../../core/components/AvatarImage";
import useGame from "../../../core/hooks/useGame";
import { useBattle } from "../../contexts/BattleContext";
import { Player } from "../../../core/definitions";
import useInterval from "../../../core/hooks/useInterval";

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
      // handleSelectAlly(availableAllies[snappedIndex]!)
      setIsChoosing(false);
      setBackToIdleTimeout(null);
    }, [snappedIndex]),
    backToIdleTimeout
  );

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
        [-iconsSize, 0, iconsSize]
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
          <TouchableOpacity onPress={() => setIsChoosing(true)}>
            <ThemedSVG
              SVGImage={CallAlly}
              height={iconsSize}
              width={iconsSize}
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
              width: iconsSize,
              height: iconsSize * 1.4,
              borderRadius: 24,
            }}
            width={iconsSize}
            pagingEnabled={false}
            height={iconsSize}
            customAnimation={animationStyle}
            data={availableAllies}
            onProgressChange={() => setBackToIdleTimeout(BACK_TO_IDLE_TIMEOUT)}
            onScrollBegin={() => setBackToIdleTimeout(null)}
            onSnapToItem={(index) => setSnappedIndex(index)}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleSelectAlly(item)}>
                <AvatarImage
                  key={index}
                  width={iconsSize}
                  height={iconsSize}
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
