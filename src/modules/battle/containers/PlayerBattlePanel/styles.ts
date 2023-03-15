import { StyleSheet } from "react-native";
import { vw } from "../../../core/utils/styles";

export const frameWidth = vw(90);
export const frameHeight = frameWidth * 0.63;

export const iconsSize = frameHeight * 0.36;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: frameWidth, 
		height: frameHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		width: frameWidth * 0.96, 
		height: frameHeight * 0.6,
		paddingHorizontal: 8,
		paddingVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	}
});

export default styles;
