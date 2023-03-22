import { StyleSheet } from "react-native";
import globalStyles from "../../../../core/utils/styles";
import {playerBattlePanelContentWidth} from "../styles";

export const modifierSize = playerBattlePanelContentWidth * 0.06;
export const mainColumnContentSize = playerBattlePanelContentWidth * 0.1;

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
	mainColumnContent: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: mainColumnContentSize,
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
		fontSize: mainColumnContentSize,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export default styles;
