import { StyleSheet, View } from "react-native"

import ScaledImage from '../../components/ScaledImage'

import logo from '../../../../../assets/logo.png'

const Header = () => {
	return (
		<View style={styles.container}>
			<View style={styles.containerImg}>
				<ScaledImage source={logo} width={230} />
			</View>
		</View>
	)
}

export const HEADER_HEIGHT = 65

const borderRadius = 12
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#00000080',
		width: '100%',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
		position: 'relative',
		borderBottomLeftRadius: borderRadius,
		borderBottomRightRadius: borderRadius
	},
	containerImg: {
		width: '100%',
		alignItems: 'center',
	},
});

export default Header
