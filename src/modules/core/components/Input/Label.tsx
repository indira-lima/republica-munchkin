import React from "react";
import { Text } from "react-native";
import styles from "./styles";

interface LabelProps {
  text: string;
}

const Label = React.memo<LabelProps>(({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
});

export default Label;

