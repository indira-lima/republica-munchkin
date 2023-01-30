import React from "react"
import { Text } from "react-native"
import styles from "./styles"

const Label = React.memo(({ text }) => {
	return <Text style={styles.label}>{text}</Text>
})

export default Label