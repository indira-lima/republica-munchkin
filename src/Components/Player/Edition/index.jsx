import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Name from "../Name";

import styles from "./styles";

const Edition = ({ player, theme }) => {
  const handleEditPlayer = useCallback(() => {}, [player]);

  return (
    <View style={styles.container}>
      <Name player={player} theme={theme} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleEditPlayer}
        style={styles.btnEdit}
      >
        <Text style={styles.txtEdit}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Edition;
