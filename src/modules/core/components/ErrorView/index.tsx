import { StyleSheet, Text, View } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import globalStyles, { circulo } from "../../utils/styles"

import Button from "../Button"
import MainContainer from "../../containers/MainContainer"

const ErrorView = ({
    message,
    action,
    actionText,
    icon = "close"
}: any) => {
	return (
		<MainContainer>
			<View style={styles.body}>
				<View style={styles.containerIcon}>
					<MaterialCommunityIcons
						name={icon}
						size={iconSize}
						color='#ffacaa'
					/>
				</View>
				<Text style={styles.message}>{message}</Text>
				<Button text={actionText} onPress={action} />
			</View>
		</MainContainer>
	)
}

const iconSize = 96
const styles = StyleSheet.create({
	body: {
		...globalStyles.containerBody,
	},
	containerIcon: {
		...circulo(iconSize * 2),
		elevation: 5,
		shadowColor: '#ffaaaa',
		backgroundColor: '#ffefee'
	},
	message: {
		...globalStyles.title,
		textAlign: 'center',
		marginBottom: 45,
		marginTop: 30
	}
});

export default ErrorView
