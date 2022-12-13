import { StyleSheet, Text } from "react-native";

import globalStyles from "../../../Utils/styles";

const Name = ({ player }) => {
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
