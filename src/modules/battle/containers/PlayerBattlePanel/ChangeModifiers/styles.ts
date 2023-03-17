import { StyleSheet } from "react-native";
import globalStyles from "../../../../core/utils/styles";
import {playerBattlePanelContentWidth} from "../styles";

export const modifierSize = playerBattlePanelContentWidth * 0.0645;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'center',
	},
	column: {
		justifyContent: "center",
		width: playerBattlePanelContentWidth * 0.1,
	},
	mainConlumn: {
		width: playerBattlePanelContentWidth * 0.25,
		position: "relative",
	},
	resetButton: {
		position: "absolute",
		bottom: -modifierSize/4,
		left: "50%",
		transform: [
			{ translateX: -modifierSize/2 }
		]
	},
	modifierButton: {
		marginVertical: 2,
	},
	modifierText: {
		...globalStyles.text,
		fontSize: modifierSize,
		textAlign: 'center',
	},
	totalPoints: {
		...globalStyles.text,
		fontSize: playerBattlePanelContentWidth * 0.1,
		textAlign: 'center',
	},
});

export default styles;
