import { Text, View } from "react-native";
import ModalContainer from "../../ModalContainer";
import styles from "./styles";

import globalStyles from "../../../Utils/styles";
import Button from "../../Button";
import PlayerAvatar from "../Avatar";
import {useState} from "react";
import {themes} from "../utils/themes";

const PlayerModal = ({ currentPlayer, ...modalProps }) => {

	const _theme = themes[currentPlayer?.theme] || themes.default
	const [theme, setTheme] = useState(_theme)
	const [avatar, setAvatar] = useState(currentPlayer?.avatar)

  return (
    <ModalContainer {...modalProps}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {currentPlayer ? currentPlayer.name : "New player"}
        </Text>
				<View style={[globalStyles.row]}>
					<PlayerAvatar player={currentPlayer} theme={theme}/>
				</View>
        <View style={[globalStyles.row, styles.rowButtons]}>
					<Button theme='cancel' type='squared' icon='close' />
					<Button theme='deefault' type='squared' icon='check' style={{ marginLeft: 5, }}/>
        </View>
      </View>
    </ModalContainer>
  );
};

export default PlayerModal;
