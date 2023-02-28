import { StyleSheet, Text } from "react-native";

import globalStyles from "../../../utils/styles";

interface NameProps {
	text: string;
}

const Name: React.FunctionComponent<NameProps> = ({
  text
}) => {
  return <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{text}</Text>;
};

const styles = StyleSheet.create({
  name: {
    ...globalStyles.text,
    fontSize: 18,
    color: "#fff",
		width: '100%',
  },
});

export default Name;
