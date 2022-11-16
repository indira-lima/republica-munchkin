import { StyleSheet, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { circulo, colors } from "../../Utils/styles";

const CameraControlButton = ({ 
	icon,
	onPress,
	disabled = false,
	left = '0%',
	color = colors.text,
	bg = 'white',
}) => {
	return (
		<Animated.View
			style={[styles.controlBtn, { left, backgroundColor: bg }]}
			entering={FadeIn}
			exiting={FadeOut}
		>
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={onPress}
				disabled={disabled}
			>
				<MaterialCommunityIcons name={icon} size={buttonIconSize} color={color} />
			</TouchableOpacity>
		</Animated.View>
	)
}

const buttonIconSize = 42
export const buttonSize = buttonIconSize * 1.5

const styles = StyleSheet.create({
	
	controlBtn: {
		...circulo(buttonSize),
		backgroundColor: '#fff',
		elevation: 6,
		justifyContent: 'center', alignItems: 'center',
		position: 'absolute',
		top: buttonSize / -2,
		transform: [ {translateX: buttonSize / -2 } ]
	},
});

export default CameraControlButton