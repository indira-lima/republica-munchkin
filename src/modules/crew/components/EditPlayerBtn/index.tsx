import { useCallback, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import PlayerModalContext from "../../contexts/ModalNewMemberContext";
import Name from "../../../core/components/Player/Name";

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
    <View style={styles.container}>
      <Name text={crewMember.name} />
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
