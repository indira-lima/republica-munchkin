import React from "react"
import { Text } from "react-native"
import styles from "./styles"

// @ts-expect-error TS(2339): Property 'text' does not exist on type '{}'.
const Label = React.memo(({ text }) => {
	return <Text style={styles.label}>{text}</Text>
})

export default Label