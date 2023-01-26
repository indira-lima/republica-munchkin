import { useCallback, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import PlayerModalContext from "../../contexts/ModalNewPlayerContext";
import Name from "../../../core/components/Player/Name";

import styles from "./styles";

const Edition = ({ player, theme }) => {
  const { setCurrentPlayer, setIsModalOpen } = useContext(PlayerModalContext);

  const handleEditPlayer = useCallback(() => {
    setCurrentPlayer(player);
    setIsModalOpen(true);
  }, [player]);

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
