import React, { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";

const ScaledImage = ({ source, width, height, style = {} }) => {
	const [calculedWidth, setCalculedWidth] = useState(0)
	const [calculedHeight, setCalculedHeight] = useState(0)
	const [uri, setUri] = useState("")

	useEffect(() => {
		if (typeof source === 'string') {
			setUri(source)
			Image.getSize(source, calculateImageSize);
		} else {
			const { uri, width, height } = Image.resolveAssetSource(source)
			setUri(uri)
			calculateImageSize(width, height)
		}
	}, [])

	const calculateImageSize = useCallback((imgWidth, imgHeight) => {
		if (width && !height) {
			setCalculedWidth(width)
			setCalculedHeight(imgHeight * (width / imgWidth))
		} else if (!width && height) {
			setCalculedWidth(imgWidth * (height / imgHeight))
			setCalculedHeight(height)
		} else if (width && height) {
			setCalculedHeight(height)
			setCalculedWidth(width)
		}
	}, [width, height])

	return uri
			? ( 
				<FastImage
					source={{uri}}
					style={[ { height: calculedHeight, width: calculedWidth }, style ]}
				/>
			)
			: null
}

export default ScaledImage
