import { StyleSheet } from "react-native";
import globalStyles, { fonts } from "../../Utils/styles";

const border = {
	overflow: "hidden",
	justifyContent: 'center',
	borderRadius: 4,
	borderWidth: 1,
	borderColor: '#ced4da',
	elevation: 6,
}

const input = {
	...globalStyles.text,
	height: 40,
	paddingHorizontal: 16,
	paddingVertical: 4,
	backgroundColor: '#fff',
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 25,
		position: 'relative',
	},
	input: {...input, ...border},
	inputBorderless: input,
	iconInput: {
		...input,
		...border,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	border,
	error: {
		borderColor: 'red',
	},
	errorMessage: {
		...globalStyles.text,
		fontSize: fonts.small,
		color: 'red',
		position: 'absolute',
		left: 15,
		top: '100%'
	},
	label: {
		...globalStyles.text,
		marginLeft: 5,
		marginBottom: 3,
	},
	itemPicker: {
		...globalStyles.text,
	}
});

export default styles