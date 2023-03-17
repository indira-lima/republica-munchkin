import { StyleSheet } from "react-native";
import { vw } from "../../../core/utils/styles";

export const frameWidth = vw(90);
export const frameHeight = frameWidth * 0.63;

export const playerBattlePanelContentWidth = frameWidth * 0.96;
export const playerBattlePanelContentHeight = frameHeight * 0.6;

export const fightersSize = frameHeight * 0.36;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: frameWidth,
    height: frameHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: playerBattlePanelContentWidth,
    height: playerBattlePanelContentHeight,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default styles;
