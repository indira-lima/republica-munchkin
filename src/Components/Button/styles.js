import { StyleSheet } from "react-native";
import globalStyles, { colors } from "../../Utils/styles";

export const themes = {
  default: {
    text: "#fff",
    img: {
      large: require("../../../assets/buttons/large/default.png"),
      squared: require("../../../assets/buttons/squared/default.png"),
      hexagon: require("../../../assets/buttons/hexagon/default.png"),
    },
  },
  cancel: {
    text: "#fff",
    img: {
      large: require("../../../assets/buttons/large/cancel.png"),
      squared: require("../../../assets/buttons/squared/cancel.png"),
      hexagon: require("../../../assets/buttons/hexagon/cancel.png"),
    },
	},
};

export const dimensions = {
  large: {
    height: 65,
    width: 310,
  },
  squared: {
    height: 48,
    width: 48,
  },
  hexagon: {
    height: 48,
    width: 48,
  },
};

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
