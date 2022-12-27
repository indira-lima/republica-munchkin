import { View } from "react-native";
import ModalContainer from "../../ModalContainer";
import styles from "./styles";

import { useCallback, useEffect, useMemo, useState } from "react";
import useGame from "../../../Hooks/useGame";
import globalStyles from "../../../Utils/styles";
import Button from "../../Button";
import TextInput from "../../Input/TextInput";
import PlayerAvatar from "../Avatar";
import ChangeGenderBtn from "../ChangeGenderBtn";
import ChangeThemeBtn from "../ChangeThemeBtn";
import themes from "../../../Utils/themes";

/**
 * Modal that opens a form to edit the player's data or to create a new one
 */
const PlayerModal = ({
  currentPlayer = {},
  onClose = () => {},
  ...modalProps
}) => {
  // gets the functions to add/edit players from the context
  const { addPlayer, editPlayer } = useGame();

  // stores the form data in a separate state
  const [playerData, setPlayerData] = useState(null);

  // gets the theme from the playerData
  const theme = useMemo(
    () => themes[playerData?.theme] || themes[0],
    [playerData]
  );

  /**
   * Initializes the playerData state with the currentPlayer prop
   * when the modal opens, and clear the state when the modal closes
   */
  useEffect(() => {
    setPlayerData(modalProps?.openModal ? currentPlayer : null);
  }, [modalProps?.openModal]);

  /**
   * Function to update one prop of the playerData state
   * Used in each field of the form
   */
  const handleSetPlayerValue = useCallback((propName, value) => {
    setPlayerData((data) => ({
      ...data,
      [propName]: value,
    }));
  }, []);

  /**
   * Create or edit a player with the current form data
   * and then closes the modal
   */
  const handleSavePlayer = useCallback(() => {
    if (playerData.id) {
      editPlayer(playerData.id, playerData);
    } else {
      addPlayer(playerData);
    }

    onClose();
  }, [playerData]);

  return (
    <ModalContainer {...modalProps} theme={theme}>
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={[globalStyles.row]}>
            <ChangeThemeBtn
              player={playerData}
              theme={theme}
              onChange={(value) => handleSetPlayerValue("theme", value)}
            />
            <PlayerAvatar
              enableEdit
              theme={theme}
              player={playerData}
              onChange={(value) => handleSetPlayerValue("avatar", value)}
            />
            <ChangeGenderBtn
              player={playerData}
              theme={theme}
              onChange={(value) => handleSetPlayerValue("gender", value)}
            />
          </View>
          <View style={styles.inputSession}>
            <TextInput
              label={">"}
              value={playerData?.name}
              onChangeText={(value) => handleSetPlayerValue("name", value)}
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
            theme="default"
            type="squared"
            icon="check"
            style={{ marginLeft: 5 }}
            onPress={handleSavePlayer}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

export default PlayerModal;
