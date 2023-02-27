import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

interface GradientBackgroundProps {
  colors: { code: string; opacity: number }[];
}

/**
 * Gradient of two colors using react-native-svg
 */
const GradientBackground: React.FunctionComponent<GradientBackgroundProps> = ({
  colors,
}) => {
  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
      <Defs>
        {/* @ts-ignore */}
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          {colors.map((color, index) => (
            <Stop
              key={index}
              offset={index}
              stopColor={color.code}
              stopOpacity={color.opacity}
            />
          ))}
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

const Dark = [
  { code: "black", opacity: 0.6 },
  { code: "black", opacity: 0.80 },
];

const Darker = [
  { code: "black", opacity: 0.80 },
  { code: "black", opacity: 0.95 },
];

export const Gradients = { Dark, Darker };

export default GradientBackground;
