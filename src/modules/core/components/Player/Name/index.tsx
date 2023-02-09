import { StyleSheet, Text } from "react-native";

import globalStyles from "../../../utils/styles";
import { Player } from "../../../definitions";

interface NameProps {
	player: Player;
}

const Name: React.FunctionComponent<NameProps> = ({
  player
}) => {
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
