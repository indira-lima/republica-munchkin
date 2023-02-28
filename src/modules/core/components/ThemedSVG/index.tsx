import React from "react";
import { StyleProp } from "react-native";
import { Theme } from "../../definitions";
import themes from "../../utils/themes";

interface ThemedSVGProps {
  theme?: Theme;
  SVGImage: any;
  style?: StyleProp<any>;
  width?: number | string;
  height?: number | string;
}

/**
 * Render a SVG image and change the primary and secondary colors
 * to the ones defined by the theme
 *
 * The SVGImage prop should be an SVG imported as a react component
 * (with first letter capitalized)
 *
 * @see .svgrrc for more info about the SVG's primary and secondary colors
 */
const ThemedSVG: React.FunctionComponent<ThemedSVGProps> = ({
  theme = themes[0],
  SVGImage,
  width,
  height,
  style,
}) => {
  return (
    <SVGImage
      primaryColor={theme?.colors.primary!}
      secondaryColor={theme?.colors.secondary!}
      width={width}
      height={height}
      style={style}
    />
  );
};

export default ThemedSVG;
