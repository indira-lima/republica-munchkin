import React from "react";
import { Text } from "react-native";

import styles from "./styles";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = React.memo<ErrorMessageProps>(({ message = "" }) => {
  return message ? <Text style={styles.errorMessage}>{message}</Text> : null;
});

export default ErrorMessage;

