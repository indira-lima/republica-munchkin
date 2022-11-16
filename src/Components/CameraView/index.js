import { useCallback, useEffect } from "react"
import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useCameraDevices } from "react-native-vision-camera"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import ScannerCamera from './ScannerCamera'
import PhotoCaptureCamera from './PhotoCaptureCamera'

import useAlerts from "../../Hooks/useAlerts"

import { colors } from "../../Utils/styles"

export const CameraViewTypes = {
	PHOTO: 'photo',
	BARCODE: 'barcode'
}

const CameraView = ({
	type = CameraViewTypes.PHOTO,
	onCapture = () => {}
}) => {
	const backCamera = useCameraDevices().back
	const isFocused = useIsFocused()
	const navigation = useNavigation()

	const { isAlertOpen } = useAlerts()

	const cameraProps = useCallback(() => ({
		style: StyleSheet.absoluteFill,
		device: backCamera,
		onCapture: onCapture,
		isActive: isFocused && !isAlertOpen,
	}), [backCamera, isFocused, isAlertOpen])

	return backCamera
		? (
			<View style={styles.container}>
				{isFocused && <StatusBar hidden /> }
				{type === CameraViewTypes.PHOTO
					?  <PhotoCaptureCamera {...cameraProps()} />
					:  <ScannerCamera {...cameraProps()} />
				}
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<MaterialCommunityIcons
						color={"#fff"}
						name={"arrow-left"}
						size={32}
					/>
				</TouchableOpacity>
			</View>
		)
		: <ActivityIndicator size="large" color="red" style={{flex: 1}} />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: colors.background,
	},
	backButton: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		transform: [
			{ rotate: '270deg' }
		]
	}
});

export default CameraView