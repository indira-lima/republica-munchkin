import { useMemo } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import styles, { themes } from "./styles";

const Button = ({
	text = "",
	onPress = () => {},
	loading = false,
	disabled = false,
	rect = false,
	theme = 'default',
	margin = [],
}) => {

	const _theme = !!themes[theme] ? themes[theme] : themes['default']
	const _btnStyle = [styles.btn, _theme.btn]

	const _disabled = disabled || loading
	_disabled && _btnStyle.push(styles.btnDisabled)

	margin.includes('top') && _btnStyle.push({ marginTop: 20 })
	margin.includes('bottom') && _btnStyle.push({ marginBottom: 20 })

	rect && _btnStyle.push({ borderRadius: 0 })

	return (
		<TouchableOpacity
			style={_btnStyle}
			onPress={onPress}
			disabled={_disabled}
			activeOpacity={0.75}
		>
			{loading
				?
					<ActivityIndicator
						size={rect ? "large" : "small"}
						color="#FFFFFF"
					/>
				:
					<Text style={[styles.textBtn, _theme.txt]}>
						{text}
					</Text>
			}
		</TouchableOpacity>
	)
}

export default Button;