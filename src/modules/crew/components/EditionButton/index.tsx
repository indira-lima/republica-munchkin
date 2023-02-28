import { useCallback, useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import PlayerModalContext from "../../contexts/ModalNewMemberContext";

import styles from "./styles";
import { CrewMember } from "../../../core/definitions";

interface EditionProps {
  crewMember: CrewMember;
}

const Edition: React.FunctionComponent<EditionProps> = ({
  crewMember: crewMember,
}) => {
  const { setCurrentMember, setIsModalOpen } = useContext(PlayerModalContext);

  const handleEditPlayer = useCallback(() => {
    setCurrentMember(crewMember);
    setIsModalOpen(true);
  }, [crewMember]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleEditPlayer}
    >
      <Text style={styles.txtEdit}>Edit</Text>
    </TouchableOpacity>
  );
};

export default Edition;
