import { useCallback, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import MainContainer from "../../Components/MainContainer";
import PanelPlayer from "../../Components/Player/Panel";
import PlayerModal from "../../Components/Player/Modal";
import PlayerModalContext, {
  PlayerModalProvider,
} from "../../Contexts/PlayerModalContext";

import useGame from "../../Hooks/useGame";

import Button from "../../Components/Button";

import globalStyles from "../../core/utils/styles";

const PlayersScreen = ({}) => {
  const { playerList } = useGame();
  const { isModalOpen, setIsModalOpen, currentPlayer, setCurrentPlayer } =
    useContext(PlayerModalContext);

  const handleAddPlayer = useCallback(() => {
    setCurrentPlayer(null);
    setIsModalOpen(true);
  }, []);

  return (
		// TODO: transformar a View em um componente
    <MainContainer>
      <View style={styles.container}>
        <Button text="ADD PLAYER" onPress={handleAddPlayer} />
        <FlatList
          data={playerList}
          renderItem={({ item }) => <PanelPlayer player={item} enableEdit />}
        />
      </View>
      <PlayerModal
        currentPlayer={currentPlayer}
        openModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainContainer>
  );
};

const PlayersWithModalContext = ({ navigation }) => {
  return (
    <PlayerModalProvider>
      <PlayersScreen navigation={navigation}></PlayersScreen>
    </PlayerModalProvider>
  );
};

const styles = StyleSheet.create({
	container: {
		...globalStyles.containerBody,	
		justifyContent: 'flex-start',
	}
})

export default PlayersWithModalContext;
