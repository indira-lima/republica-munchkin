import React from "react"
import { Text } from "react-native"

import styles from "./styles"

const ErrorMessage = React.memo(({ message = "" }) => {
	return message
		? <Text style={styles.errorMessage}>{message}</Text>
		: null
})

export default ErrorMessage