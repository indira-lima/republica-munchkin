import { StyleSheet, Text } from "react-native";

import globalStyles from "../../../utils/styles";

const Name = ({
  player
}: any) => {
  return <Text style={styles.name}>{player.name}</Text>;
};

const styles = StyleSheet.create({
  name: {
    ...globalStyles.text,
    fontSize: 20,
    color: "#fff",
  },
});

export default Name;
