import { useCallback, useContext } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import MainContainer from "../../Components/MainContainer";
import PanelPlayer from "../../Components/Player/Panel";
import PlayerModal from "../../Components/Player/Modal";
import PlayerModalContext, {
  PlayerModalProvider,
} from "../../Contexts/PlayerModalContext";

import useGame from "../../Hooks/useGame";

import styles from "./styles";
import Button from "../../Components/Button";

const PlayersScreen = ({}) => {
  const { playerList } = useGame();
  const { isModalOpen, setIsModalOpen, currentPlayer, setCurrentPlayer } =
    useContext(PlayerModalContext);

  const handleAddPlayer = useCallback(() => {
    setCurrentPlayer(null);
    setIsModalOpen(true);
  }, []);

  return (
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

export default PlayersWithModalContext;
