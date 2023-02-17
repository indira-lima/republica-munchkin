import { StyleSheet, Text } from "react-native";

import globalStyles from "../../../utils/styles";

interface NameProps {
	text: string;
}

const Name: React.FunctionComponent<NameProps> = ({
  text
}) => {
  return <Text style={styles.name}>{text}</Text>;
};

const styles = StyleSheet.create({
  name: {
    ...globalStyles.text,
    fontSize: 20,
    color: "#fff",
  },
});

export default Name;
