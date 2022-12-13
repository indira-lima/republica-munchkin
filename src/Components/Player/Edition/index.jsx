import { Text, View } from "react-native";
import Name from "../Name";

import styles from "./styles";

const Edition = ({ ...playerThemeProps }) => {
  return (
    <View style={styles.container}>
      <Name {...playerThemeProps} />
      <Text style={styles.txtEdit}>Edit</Text>
    </View>
  );
};

export default Edition;
