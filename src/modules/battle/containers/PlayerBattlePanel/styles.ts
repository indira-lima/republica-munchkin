import { StyleSheet } from "react-native";
import { vw } from "../../../core/utils/styles";

export const frameWidth = vw(90);
export const frameHeight = frameWidth * 0.63;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
		width: frameWidth, 
		height: frameHeight,
	},
});

export default styles;
