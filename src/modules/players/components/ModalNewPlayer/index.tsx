import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import useGame from "../../../core/hooks/useGame";
import Button from "../../../core/components/Button";
import TextInput from "../../../core/components/Input/TextInput";
import PlayerAvatar from "../../../core/containers/PlayerPanel/Avatar";
import ModalContainer, {
  ModalContainerProps,
} from "../../../core/containers/ModalContainer";

import ChangeGenderBtn from "./ChangeGenderBtn";
import ChangeThemeBtn from "./ChangeThemeBtn";

import globalStyles from "../../../core/utils/styles";
import themes from "../../../core/utils/themes";

import styles from "./styles";
import { Player } from "../../../core/definitions";

interface PlayerModalProps {
  currentPlayer: Player;
  onClose: () => void;
}

/**
 * Modal that opens a form to edit the player's data or to create a new one
 */
const PlayerModal: React.FunctionComponent<
  PlayerModalProps & ModalContainerProps
> = ({ currentPlayer = {}, onClose = () => {}, ...modalProps }) => {
  // gets the functions to add/edit players from the context
  const { addPlayer, editPlayer } = useGame();

  // stores the form data in a separate state
  const [playerData, setPlayerData] = useState<Player>({} as Player);

  // gets the theme from the playerData
  const theme = useMemo(() => {
    if (playerData?.theme) {
      return themes.find((t) => t.name === playerData.theme?.name);
    }
    return themes[0];
  }, [playerData]);

  /**
   * Initializes the playerData state with the currentPlayer prop
   * when the modal opens, and clear the state when the modal closes
   */
  useEffect(() => {
    // @ts-ignore
    setPlayerData(modalProps?.openModal ? currentPlayer : null);
  }, [modalProps?.openModal]);

  /**
   * Function to update one prop of the playerData state
   * Used in each field of the form
   */
  const handleSetPlayerValue = useCallback((propName: any, value: any) => {
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
    <ModalContainer {...modalProps} theme={theme!}>
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={[globalStyles.row]}>
            <ChangeThemeBtn
              player={playerData}
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
              onChange={(value: any) => handleSetPlayerValue("gender", value)}
            />
          </View>
          <View style={styles.inputSession}>
            <TextInput
              label={">"}
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
            icon="close"
            onPress={onClose}
          />
          <Button
            theme={theme?.name}
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
