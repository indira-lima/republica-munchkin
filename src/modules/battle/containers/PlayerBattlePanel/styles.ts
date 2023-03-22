import { StyleSheet } from "react-native";
import globalStyles, { vw } from "../../../core/utils/styles";

export const frameWidth = vw(90);
export const frameHeight = frameWidth * 0.63;

export const playerBattlePanelContentWidth = frameWidth * 0.96;
export const playerBattlePanelContentHeight = frameHeight * 0.6;

export const fightersSize = frameHeight * 0.30;

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
    paddingVertical: 0,
    overflow: "hidden",
  },
	section: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
	},
	playerName: {
		...globalStyles.text,
		marginTop: 2,
	},
	mainSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
		flex: 1,
		paddingVertical: 4,
	},
});

export default styles;
