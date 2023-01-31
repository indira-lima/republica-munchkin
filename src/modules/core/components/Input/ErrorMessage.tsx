import React from "react"
import { Text } from "react-native"

import styles from "./styles"

// @ts-expect-error TS(2339): Property 'message' does not exist on type '{}'.
const ErrorMessage = React.memo(({ message = "" }) => {
	return message
		? <Text style={styles.errorMessage}>{message}</Text>
		: null
})

export default ErrorMessage