import { StyleSheet } from "react-native";
import globalStyles, { colors } from "../../Utils/styles";

export const themes = {
	"default": {
		btn: {
			backgroundColor: colors.action,
			borderColor: colors.action,
		},
		txt: {}
	},
	"outline": {
		btn: {
			backgroundColor: 'transparent',
			borderColor: colors.action,
			elevation: 0,
		},
		txt: {
			color: colors.action,
		}
	},
	"primary": {
		btn: {
			backgroundColor: colors.primary,
			borderColor: colors.primary,
		},
		txt: {}
	},
	"outline-secondary": {
		btn: {
			backgroundColor: '#fff',
			borderColor: colors.secondary,
		},
		txt: {
			color: colors.secondary
		}
	},
	"outline-primary": {
		btn: {
			backgroundColor: '#fff',
			borderColor: colors.primary,
		},
		txt: {
			color: colors.primary
		}
	},
}

const styles = StyleSheet.create({
	btn: {
		height: 65,
		width: 310,
		alignSelf: 'center',
		alignItems: "center",
		justifyContent: 'center',
		position: 'relative',
	},
	imgBg: {
		...StyleSheet.absoluteFillObject,
	},
	textBtn: {
		...globalStyles.text,
		color: '#fff',
		textAlign: 'center',
	},
	btnDisabled: {
		opacity: 0.7
	},
})

export default styles;
