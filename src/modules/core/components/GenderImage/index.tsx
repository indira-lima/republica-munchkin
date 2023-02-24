import React from "react";

// @ts-ignore
import Pangender from "../../../../../assets/genders/Pangender.svg";
// @ts-ignore
import Agender from "../../../../../assets/genders/Agender.svg";
// @ts-ignore
import Fem from "../../../../../assets/genders/Fem.svg";
// @ts-ignore
import Masc from "../../../../../assets/genders/Masc.svg";

import themes from "../../utils/themes";
import { Theme } from "../../definitions";

const genders = [Pangender, Agender, Fem, Masc];

export const LAST_GENDER_INDEX = genders.length - 1;

interface GenderImageProps {
  index: number;
  theme?: Theme;
  style?: any;
  width: number;
  height: number;
}

/**
 * Render the avatar SVG component based on the index received as prop
 *
 * For now I couldn't find another way of importing the SVG images individually
 * as components (which enable changing the primary and secondary colors) AND
 * render just one based on the index received; the choosen solution was to store
 * all the images in an array and check the index in a .map loop
 */
const GenderImage: React.FunctionComponent<GenderImageProps> = ({
  index,
  theme,
  style,
  width,
  height,
}) => {
  index = index !== undefined ? index : 0;
  theme = theme?.colors !== undefined ? theme : themes[0];
  return (
    <>
      {genders.map((Gender, i) => {
        if (i !== index) return;
        return (
          <Gender
            key={i}
            primaryColor={theme?.colors.primary}
            secondaryColor={theme?.colors.secondary}
            style={style}
            width={width}
            height={height}
          />
        );
      })}
    </>
  );
};

export default GenderImage;
