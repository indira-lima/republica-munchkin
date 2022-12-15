import { Text } from "react-native";
import ModalContainer from "../../ModalContainer";
import styles from "./styles";

const PlayerModal = ({ currentPlayer, ...modalProps }) => {
  return (
    <ModalContainer {...modalProps}>
      <Text style={styles.text}>
        {currentPlayer ? currentPlayer.name : "New player"}
      </Text>
    </ModalContainer>
  );
};

export default PlayerModal;
