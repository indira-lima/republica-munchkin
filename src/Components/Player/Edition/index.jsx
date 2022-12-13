import { Text, View } from "react-native";
import Name from "../Name";

import styles from "./styles";

const Edition = ({ player }) => {
  return (
    <View style={styles.container}>
      <Name player={player} />
      <Text style={styles.txtEdit}>Edit</Text>
    </View>
  );
};

export default Edition;
