import React, { Fragment, useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import ThemedSVG from "../../../core/components/ThemedSVG";

// @ts-ignore
import CallAlly from "../../../../../assets/icons/CallAlly.svg";
import globalStyles from "../../../core/utils/styles";
import { battleTheme } from "../../../core/utils/themes";
import {
  iconsSize,
} from "../PlayerBattlePanel/styles";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import AvatarImage from "../../../core/components/AvatarImage";
import useGame from "../../../core/hooks/useGame";
import { useBattle } from "../../contexts/BattleContext";
import {Player} from "../../../core/definitions";

interface ChooseAllyProps {
  // TODO: Component props
}

/**
 * ChooseAlly documentation
 */
const ChooseAlly: React.FunctionComponent<ChooseAllyProps> = () => {
  const [isChoosing, setIsChoosing] = useState<boolean>(false);

  const RIGHT_OFFSET = -24;

  const { playerList } = useGame();
  const { mainPlayer, setAllyPlayer } = useBattle();

	const handleSelectAlly = useCallback((ally: Player) => {
		setAllyPlayer(ally);
		setIsChoosing(false);
	}, [])


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
        <Fragment>
          <TouchableOpacity onPress={() => setIsChoosing((is) => !is)}>
            <ThemedSVG
              SVGImage={CallAlly}
              height={iconsSize}
              width={iconsSize}
              theme={battleTheme}
            />
          </TouchableOpacity>
          <Text style={globalStyles.text}>Help!</Text>
        </Fragment>
      )}
      {isChoosing && (
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
          data={playerList.filter((p) => p.id !== mainPlayer?.id)}
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
      )}
    </Fragment>
  );
};

export default ChooseAlly;
