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
		height: 40,
		paddingHorizontal: 16,
		width: '100%',
		
		alignSelf: 'center',
		alignItems: "center",
		justifyContent: 'center',

		borderWidth: 2,
		borderRadius: 4,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		
		elevation: 5,
	},
	textBtn: {
		...globalStyles.text,
		color: '#fff',
		padding: 7,
		textTransform: 'capitalize',
		textAlign: 'center',
	},
	btnDisabled: {
		opacity: 0.7
	},
})

export default styles;