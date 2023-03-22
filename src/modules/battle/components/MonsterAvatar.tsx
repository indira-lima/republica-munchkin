import React from "react";
import { StyleProp, View } from "react-native";

// @ts-ignore
import Monster1 from "../../../../assets/monsters/Monster_1.svg";
// @ts-ignore
import Monster2 from "../../../../assets/monsters/Monster_2.svg";
// @ts-ignore
import Monster3 from "../../../../assets/monsters/Monster_3.svg";
// @ts-ignore
import Monster4 from "../../../../assets/monsters/Monster_4.svg";
// @ts-ignore
import Monster5 from "../../../../assets/monsters/Monster_5.svg";
// @ts-ignore
import Monster6 from "../../../../assets/monsters/Monster_6.svg";
// @ts-ignore
import Monster7 from "../../../../assets/monsters/Monster_7.svg";
// @ts-ignore
import Monster8 from "../../../../assets/monsters/Monster_8.svg";
// @ts-ignore
import Monster9 from "../../../../assets/monsters/Monster_9.svg";

import ThemedSVG from "../../core/components/ThemedSVG";
import { Theme } from "../../core/definitions";


const monsters = [
  Monster1,
  Monster2,
  Monster3,
  Monster4,
  Monster5,
  Monster6,
  Monster7,
  Monster8,
  Monster9,
];

export const LAST_MONSTER_INDEX = monsters.length - 1;

interface MonsterImageProps {
  index: number;
  theme?: Theme;
  style?: StyleProp<View>;
  width: number;
  height: number;
}

/**
 * Render the monster SVG component based on the index received as prop
 *
 * For now I couldn't find another way of importing the SVG images individually
 * as components (which enable changing the primary and secondary colors) AND
 * render just one based on the index received; the choosen solution was to store
 * all the images in an array and check the index in a .map loop
 */
const MonsterImage: React.FunctionComponent<MonsterImageProps> = ({
  index,
  theme,
  style,
  width,
  height,
}) => {
  index = index !== undefined ? index : 0;
  return (
    <>
      {monsters.map((Monster, i) => {
        if (i !== index) return null;
        return (
          <ThemedSVG
            key={i}
            SVGImage={Monster}
            theme={theme}
            style={style}
            width={width}
            height={height}
          />
        );
      })}
    </>
  );
};

export default MonsterImage;
