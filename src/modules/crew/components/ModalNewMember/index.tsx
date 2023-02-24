import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import Button from "../../../core/components/Button";
import TextInput from "../../../core/components/Input/TextInput";
import ModalContainer, {
  ModalContainerProps,
} from "../../../core/containers/ModalContainer";
import useCrew from "../../../core/hooks/useCrew";

import CrewMemberGender from "../../containers/GenderRole";
import ChangeThemeBtn from "./ChangeThemeBtn";

import globalStyles from "../../../core/utils/styles";

import { CrewMember } from "../../../core/definitions";
import Avatar from "../../containers/CrewMemberPanel/Avatar";
import styles from "./styles";

interface ModalNewMemberProps {
  currentMember?: CrewMember;
  onClose: () => void;
}

/**
 * Modal that opens a form to edit the player's data or to create a new one
 */
const ModalNewMember: React.FunctionComponent<
  ModalNewMemberProps & ModalContainerProps
> = ({ currentMember = {}, onClose = () => {}, ...modalProps }) => {
  // gets the functions to add/edit players from the context
  const { addCrewMember, editCrewMember } = useCrew();

  // stores the form data in a separate state
  const [memberData, setMemberData] = useState<CrewMember>({} as CrewMember);

  /**
   * Initializes the playerData state with the currentPlayer prop
   * when the modal opens, and clear the state when the modal closes
   */
  useEffect(() => {
    // @ts-ignore
    setMemberData(modalProps?.openModal ? currentMember : null);
  }, [modalProps?.openModal]);

  /**
   * Function to update one prop of the playerData state
   * Used in each field of the form
   */
  const handleSetMemberProp = useCallback((propName: any, value: any) => {
    setMemberData((data) => ({
      ...data,
      [propName]: value,
    }));
  }, []);

  /**
   * Create or edit a player with the current form data
   * and then closes the modal
   */
  const handleSaveCrewMember = useCallback(() => {
    if (memberData?.id) {
      editCrewMember(memberData.id, memberData);
    } else {
      addCrewMember(memberData);
    }

    onClose();
  }, [memberData, editCrewMember, addCrewMember]);

  return (
    <ModalContainer {...modalProps} theme={memberData?.theme!}>
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={[globalStyles.row]}>
            <ChangeThemeBtn
              crewMember={memberData}
              onChange={(value: any) => handleSetMemberProp("theme", value)}
            />
            <Avatar
              enableEdit
              crewMember={memberData}
              onChange={(value: any) => handleSetMemberProp("avatar", value)}
            />
            <CrewMemberGender
              crewMember={memberData}
              onChange={(value: any) => handleSetMemberProp("gender", value)}
							height={52}
							width={52}
            />
          </View>
          <View style={styles.inputSession}>
            <TextInput
              label={">"}
              value={memberData?.name}
              onChangeText={(value: any) => handleSetMemberProp("name", value)}
              placeholder="Username"
            />
          </View>
        </View>
        <View style={[globalStyles.row, styles.rowButtons]}>
          <Button
            theme="cancel"
            type="squared"
            icon="close"
            onPress={onClose}
          />
          <Button
            theme={memberData?.theme?.name}
            type="squared"
            icon="check"
            style={{ marginLeft: 5 }}
            onPress={handleSaveCrewMember}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalNewMember;
