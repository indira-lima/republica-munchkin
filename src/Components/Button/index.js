import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import backgroundImg from "../../../assets/button-large-default.png";
import FastImage from "react-native-fast-image";

import styles from "./styles";

const Button = ({
	text = "",
	onPress = () => {},
	loading = false,
	disabled = false,
}) => {
	const _disabled = disabled || loading
	const _btnStyle = [styles.btn]
	_disabled && _btnStyle.push(styles.btnDisabled)

	return (
		<TouchableOpacity
			style={_btnStyle}
			onPress={onPress}
			disabled={_disabled}
			activeOpacity={0.75}
		>
			<FastImage source={backgroundImg} style={styles.imgBg}/>
			{loading
				?
					<ActivityIndicator
						size="small"
						color="#FFFFFF"
					/>
				:
					<Text style={styles.textBtn}>
						{text}
					</Text>
			}
		</TouchableOpacity>
	)
}

export default Button;
