import { StyleSheet } from "react-native";
import globalStyles from "../../../core/utils/styles";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/buttons/... Remove this comment to see the full error message
import BtnLarge from "../../../../../assets/buttons/large.svg";
// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/buttons/... Remove this comment to see the full error message
import BtnSquared from "../../../../../assets/buttons/squared.svg";
// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/buttons/... Remove this comment to see the full error message
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
      height: 60,
      width: 300,
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
    opacity: 0.9,
  },
});

export default styles;
