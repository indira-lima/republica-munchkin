import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import ImageView from "react-native-image-viewing"

const ImageViewer = ({ image, subtitle }) => {
	const [visible, setIsVisible] = useState(false)

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setIsVisible(true)}
				activeOpacity={0.8}
				style={styles.containerImage}
			>
				<FastImage source={image} style={styles.image} resizeMode='cover' />
				{!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			</TouchableOpacity>
			<ImageView
				images={[image]}
				imageIndex={0}
				visible={visible}
				onRequestClose={() => setIsVisible(false)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 15,
	},
	containerImage: {
		justifyContent: 'center',
		marginBottom: 5
	},
	image: {
		width: '100%',
		height: 250
	},
	subtitle: {
		fontSize: 12,
		color: '#111',
		textAlign: 'left',
		paddingLeft: 5
	},
});

export default ImageViewer