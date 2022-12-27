import { Dimensions, StyleSheet } from "react-native";

const vw = Dimensions.get('screen').width / 100
export const modalSize = 100 * vw

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000a3'
	},
	modalView: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: "center",
		width: modalSize,
		height: modalSize,
		paddingVertical: 60,
		paddingHorizontal: 55,
	},
	contentWrapper: {
		flex: 1,
		width: '100%',
		// borderColor: 'red',
		// borderWidth: 1
	}
})

export default styles
