import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "react-native-vision-camera"
import FastImage from "react-native-fast-image";

import useCancelablePromise from "../../Hooks/useCancelablePromise";

import CameraControlButton, { buttonSize } from "./CameraControlButton";
import { colors } from "../../Utils/styles";

const PhotoCaptureCamera = ({ onCapture, ...props }) => {
	const { cancelablePromise } = useCancelablePromise()
	const camera = useRef(null)

	const [isTakingPhoto, setIsTakingPhoto] = useState(false)
	const [photo, setPhoto] = useState(null)
	
	const [flashState, setFlashState] = useState('off')

	const handleToggleFlash = useCallback(() => {
		setFlashState(flashState === 'on' ? 'off' : 'on')
	}, [flashState])

	const handleTakePhoto = useCallback(async () => {
		if (isTakingPhoto) return
		setIsTakingPhoto(true)
		
		cancelablePromise(
			camera.current?.takePhoto({
				flash: flashState,
			}),
			'Taking photo'
		)
		.then((photo) => {
			setPhoto(photo)
		})
		.finally(() => {
			setIsTakingPhoto(false)
		})

	}, [flashState, isTakingPhoto])

	const handleAcceptPhoto = useCallback(() => {
		onCapture(photo)
	}, [photo])
	
	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				<Camera
					{...props}
					ref={camera}
					photo={true}
					enableZoomGesture
					isActive={props.isActive && !photo}
				/>
				{photo && (
					<View style={styles.viewPhotoContainer}>
						<FastImage
							source={{ uri: `file://${photo.path}` }}
							style={styles.photoImage}
						/>
					</View>
				)}
			</View>
			<View style={styles.containerCameraControl}>
				{!!photo && (<>
						{/* Aceitar e enviar */}
						<CameraControlButton
							onPress={handleAcceptPhoto}
							icon='check'
							left='50%'
							color={'white'}
							bg={colors.action}
						/>
						{/* Descartar foto e tirar novamente */}
						<CameraControlButton
							onPress={() => setPhoto(null)}
							icon='close'
							left='83%'
						/>
				</>)}
				{!photo && (<>
						{/* Ligar/desligar o flash */}
						<CameraControlButton
							onPress={handleToggleFlash}
							left='16%'
							icon={flashState === 'on' ? 'flashlight' : 'flashlight-off'}
							color={flashState === 'on' ? colors.accent : undefined}
						/>
		
						{/* Tirar foto */}
						<CameraControlButton
							onPress={handleTakePhoto}
							disabled={isTakingPhoto}
							icon="camera"
							left='50%'
							color={'white'}
							bg={colors.action}
						/>
					</>)
				}
			</View>
		</View>
	)
}

const cornersBorderRadius = 32
const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative'
	},
	cameraContainer: {
		flex: 1,
		backgroundColor: '#000',
		overflow: 'hidden',
		borderBottomLeftRadius: cornersBorderRadius,
		borderBottomRightRadius: cornersBorderRadius,
	},
	viewPhotoContainer: {
		flex: 1,
		borderBottomLeftRadius: cornersBorderRadius,
		borderBottomRightRadius: cornersBorderRadius,
	},
	photoImage: {
		flex: 1,
		borderBottomLeftRadius: cornersBorderRadius,
		borderBottomRightRadius: cornersBorderRadius,
	},
	containerCameraControl: {
		height: buttonSize * 0.75,
		backgroundColor: 'white',
		position: 'relative',
	},
});

export default PhotoCaptureCamera
