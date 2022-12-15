import { StyleSheet, Dimensions } from "react-native";

const viewWidth = Dimensions.get('screen').width / 100
const viewHeight = Dimensions.get('screen').height / 100

export const vw = (amount = 100) => amount * viewWidth 
export const vh = (amount = 100) => amount * viewHeight 

export const colors = {
	primary: '#316E9F',
	secondary: '#103339',
	action: '#5AADCB',
	accent: '#DE2E2C',
	background: '#CBC8C3',
	text: '#CBC8C3',
	success: '#5cb85c',
	danger: '#d9534f',
}

export const fonts = {
	family: 'KellySlab',
	small: 10,
	medium: 14,
	large: 16,
	title: 20,
}

const defaultText = {
	fontFamily: fonts.family,
	fontSize: fonts.medium,
	color: colors.text,
}

export const globalStyles = StyleSheet.create({
	containerBody: {
		flex: 1,
		paddingHorizontal: 15,
		paddingTop: 15,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center'
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	borderRadius: {
		borderRadius: 10,
	},
	text: {
		...defaultText,
		fontWeight: 'normal',
    textAlign: 'center',
	},
	title: {
		...defaultText,
		fontSize: fonts.title,
		fontWeight: 'bold',
    textAlign: 'center',
	},
	textLabel: {
		...defaultText,
		fontWeight: 'bold',
		textAlign: 'left',
	},
});

/**
 * Retorna as propriedades usadas para montar um cículo
 * dentro de um StyleSheet do React Native
 * 
 * @param {number} size o tamanho do círculo em pixels
 * @returns { width: number; height: number; borderRadius: number }
 */
export const circulo = (size, center = true) => {
	const centerStyle = center ? globalStyles.flexCenter : {}

	return {
		width: size,
		height: size,
		borderRadius: size / 2,
		...centerStyle,
	}
}

export const SMALL_SCREEN_SIZE = 640

export default globalStyles

