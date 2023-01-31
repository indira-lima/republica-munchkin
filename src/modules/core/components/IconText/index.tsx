import { Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import globalStyles, { colors, fonts } from "../../utils/styles";

const IconText = ({
    children,
    size = fonts.medium,
    icon,
    title,
    iconColor,
    style = {}
}: any) => {
	return (
		<Text
			style={[
				{
					...globalStyles.text,
					fontSize: title ? fonts.title : Number(size),
					marginBottom: title ? 8 : 5,
					fontWeight: title ? 'bold' : 'normal',
				}, style
			]}
		>
			<MaterialCommunityIcons
				color={iconColor || style.color || colors.accent}
				name={icon}
				size={title ? fonts.title : Number(size)}
			/>{" "}{children}
		</Text>
	)
}

export default IconText