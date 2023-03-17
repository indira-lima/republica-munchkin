import { StyleSheet } from "react-native";
import globalStyles, { fonts } from "../../../core/utils/styles";
import { frameContentWidth } from "../PlayerBattlePanel/styles";

export const modifierSize = frameContentWidth * 0.0645;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    justifyContent: "center",
    width: frameContentWidth * 0.1,
  },
  mainConlumn: {
    width: frameContentWidth * 0.25,
    position: "relative",
  },
  resetButton: {
    position: "absolute",
    bottom: -modifierSize / 4,
    borderWidth: 1,
    borderColor: "transparent",
    left: "50%",
    transform: [{ translateX: -modifierSize / 2 }],
  },
  modifierButton: {
    marginVertical: 2,
  },
  modifierText: {
    ...globalStyles.text,
    fontSize: modifierSize,
    textAlign: "center",
  },
  totalPoints: {
    ...globalStyles.text,
    fontSize: frameContentWidth * 0.1,
    textAlign: "center",
  },
});

export default styles;
