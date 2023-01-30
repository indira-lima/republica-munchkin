import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { Linking } from "react-native"
import { Camera } from "react-native-vision-camera"

/**
 * Hook para verificar e, se necessário, pedir permissão de uso de câmera
 */
const useCameraPermission = () => {
	const [canUseCamera, setCanUseCamera] = useState(false)

	/**
	 * Função para abrir a tela de configurações do aplicativo, para que
	 * o usuário conceda permissão de câmera manualmente
	 */
	const goToConfig = useCallback(() => {
		Linking.openSettings()
	}, [])

	/**
	 * Verifica o estado da permissão para uso de câmera
	 */
	useFocusEffect(
		useCallback(() => {
			async function checkCameraPermissions() {
				try {
					let _canUseCamera = true
					const cameraPermission = await Camera.getCameraPermissionStatus()

					if (cameraPermission !== 'authorized') {
						const newCameraPermission = await Camera.requestCameraPermission()

						if (newCameraPermission !== 'authorized') {
							_canUseCamera = false
						}
					}

					setCanUseCamera(_canUseCamera)
				} catch (err) {
					console.log(err);
					setCanUseCamera(false)
				}
			}

			checkCameraPermissions()
		}, [])
	)

	return { canUseCamera, goToConfig }
}

export default useCameraPermission
