import React from "react";
import { StyleSheet, Text } from "react-native";
import globalStyles, { colors } from "../../utils/styles";
import IconText from "../IconText";

const Badge = React.memo(({ children, theme, icon, ...textProps }) => {
	const style = {...styles.badge, backgroundColor: colors[theme] || colors.primary }

	if (icon) {
		return (
			<IconText icon={icon} style={style} {...textProps}>
				{children}
			</IconText>
		)
	}

	return <Text style={style} {...textProps}>{children}</Text>
})

const styles = StyleSheet.create({
	badge: {
		...globalStyles.text,
		textAlign: 'center',
		color: 'white',
		paddingVertical: 3,
		paddingHorizontal: 4.8,
		borderRadius: 4,
	}
});

export default Badge
