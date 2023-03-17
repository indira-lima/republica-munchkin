import { StyleSheet } from "react-native";
import { vw } from "../../../core/utils/styles";

export const frameWidth = vw(90);
export const frameHeight = frameWidth * 0.63;

export const monsterBattlePanelContentWidth = frameWidth * 0.96;
export const monsterBattlePanelContentHeight = frameHeight * 0.6;

export const monstersSize = frameHeight * 0.36;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: frameWidth,
    height: frameHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: monsterBattlePanelContentWidth,
    height: monsterBattlePanelContentHeight,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default styles;

