import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import useGame from "../../../core/hooks/useGame";
import Button from "../../../core/components/Button";
import TextInput from "../../../core/components/Input/TextInput";
import PlayerAvatar from "../../../core/containers/PlayerPanel/Avatar";
import ModalContainer from "../../../core/containers/ModalContainer";

import ChangeGenderBtn from "./ChangeGenderBtn";
import ChangeThemeBtn from "./ChangeThemeBtn";

import globalStyles from "../../../core/utils/styles";
import themes from "../../../core/utils/themes";

import styles from "./styles";

/**
 * Modal that opens a form to edit the player's data or to create a new one
 */
const PlayerModal = ({
  currentPlayer = {},
  onClose = () => {},
  ...modalProps
}) => {
  // gets the functions to add/edit players from the context
  // @ts-expect-error TS(2339): Property 'addPlayer' does not exist on type '{}'.
  const { addPlayer, editPlayer } = useGame();

  // stores the form data in a separate state
  const [playerData, setPlayerData] = useState(null);

  // gets the theme from the playerData
  const theme = useMemo(
    // @ts-expect-error TS(2339): Property 'theme' does not exist on type 'never'.
    () => themes[playerData?.theme] || themes[0],
    [playerData]
  );

  /**
   * Initializes the playerData state with the currentPlayer prop
   * when the modal opens, and clear the state when the modal closes
   */
  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '{} | null' is not assignable to ... Remove this comment to see the full error message
    setPlayerData(modalProps?.openModal ? currentPlayer : null);
  }, [modalProps?.openModal]);

  /**
   * Function to update one prop of the playerData state
   * Used in each field of the form
   */
  const handleSetPlayerValue = useCallback((propName: any, value: any) => {
    setPlayerData((data) => ({
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
      ...data,
      [propName]: value,
    }));
  }, []);

  /**
   * Create or edit a player with the current form data
   * and then closes the modal
   */
  const handleSavePlayer = useCallback(() => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (playerData.id) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
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
              onChange={(value: any) => handleSetPlayerValue("theme", value)}
            />
            <PlayerAvatar
              enableEdit
              theme={theme}
              player={playerData}
              onChange={(value: any) => handleSetPlayerValue("avatar", value)}
            />
            <ChangeGenderBtn
              player={playerData}
              theme={theme}
              onChange={(value: any) => handleSetPlayerValue("gender", value)}
            />
          </View>
          <View style={styles.inputSession}>
            <TextInput
              label={">"}
              // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
              value={playerData?.name}
              onChangeText={(value: any) => handleSetPlayerValue("name", value)}
              placeholder="Username"
            />
          </View>
        </View>
        <View style={[globalStyles.row, styles.rowButtons]}>
          <Button
            theme="cancel"
            type="squared"
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'null | un... Remove this comment to see the full error message
            icon="close"
            onPress={onClose}
          />
          <Button
            theme={theme?.name}
            type="squared"
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'null | un... Remove this comment to see the full error message
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
