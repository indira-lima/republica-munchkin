import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { Camera } from "react-native-vision-camera"
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import globalStyles, { colors, fonts } from "../../Utils/styles";

const ScannerCamera = ({ onCapture, ...props }) => {
	const navigation = useNavigation()

	const [frameProcessor, barcodes] = useScanBarcodes([
		BarcodeFormat.EAN_13,
	], { checkInverted: true });

	const [barcodeCaptured, setBarcodeCaptured] = useState(false)

	useEffect(() => {
		if (barcodeCaptured) return
		if (barcodes && barcodes.length > 0) {
			setBarcodeCaptured(true)
			onCapture(barcodes[0].rawValue)
		}
	}, [barcodes])

	useFocusEffect(
		useCallback(() => setBarcodeCaptured(false),  [])
	)

	return (
		<View style={styles.container}>
			<Camera
				frameProcessor={frameProcessor}
				frameProcessorFps={5}
				isActive={props.isActive && !barcodeCaptured}
				{...props}
			/>
			<View style={styles.redBar} />
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('DigitarCodigoProduto')
				}}
				style={styles.btnDigitarCodigo}
			>
				<MaterialCommunityIcons
					color={"#fff"}
					name={"numeric"}
					size={32}
				/>
				<Text style={styles.txtDigitarCodigo}>Digitar código</Text>
			</TouchableOpacity>
			<View style={styles.containerEnquadrar}>
				<MaterialCommunityIcons
					color={"#fff"}
					name={"barcode"}
					size={32}
				/>
				<Text style={styles.txtEnquadrar}>
					Enquadre o código de barras dentro da linha vermelha
				</Text>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative'
	},
	redBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: '50%',
		height: 1,
		transform: [
			{ translateY: -1 }
		],
		backgroundColor: 'red',
	},
	btnDigitarCodigo: {
		position: 'absolute',
		width: 160,
		left: '50%',
		transform: [
			{ translateX: -80 }
		],
		bottom: '10%',
		backgroundColor: `${colors.action}dd`,
		paddingVertical: 8,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	txtDigitarCodigo: {
		...globalStyles.text,
		color: '#fff',
		marginLeft: 10,
	},
	containerEnquadrar: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 45,
		backgroundColor: '#00000080',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	txtEnquadrar: {
		...globalStyles.text,
		fontSize: fonts.large,
		textAlign: 'center',
		color: '#fff',
		textAlignVertical: 'center',
		marginLeft: 15,
	},
});

export default ScannerCamera	