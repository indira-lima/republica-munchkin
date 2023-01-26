import { StyleSheet } from "react-native";
import globalStyles from "../../../core/utils/styles";

import BtnLarge from "../../../../../assets/buttons/large.svg";
import BtnSquared from "../../../../../assets/buttons/squared.svg";
import BtnHexagon from "../../../../../assets/buttons/hexagon.svg";
import themes from "../../utils/themes";

export const sources = {
  large: BtnLarge,
  squared: BtnSquared,
  hexagon: BtnHexagon,
};

export const dimensions = {
  large: {
    container: {
      height: 65,
      width: 310,
    },
    icon: 36,
  },
  squared: {
    container: {
      height: 48,
      width: 48,
    },
    icon: 36,
  },
  hexagon: {
    container: {
      height: 48,
      width: 48,
    },
    icon: 24,
  },
};

export const buttonThemes = [
  ...themes,
  {
    name: "cancel",
    colors: {
      text: "#fff",
      primary: "#ADADAD",
      secondary: "#fff",
    },
  },
];

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imgBg: {
    ...StyleSheet.absoluteFillObject,
  },
  textBtn: {
    ...globalStyles.text,
    color: "#fff",
    textAlign: "center",
  },
  btnDisabled: {
    opacity: 0.7,
  },
});

export default styles;
