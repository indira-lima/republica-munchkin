import React from "react";
import { StyleSheet, Text } from "react-native";
import globalStyles, { colors } from "../../utils/styles";
import IconText from "../IconText";

// @ts-expect-error TS(2339): Property 'children' does not exist on type '{}'.
const Badge = React.memo(({ children, theme, icon, ...textProps }) => {
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
