import { useCallback, useContext } from "react";
import { StyleSheet } from "react-native";
import MainContainer from "../../core/containers/MainContainer";
import PlayerModal from "../components/ModalNewPlayer";

import PlayerModalContext, {
  PlayerModalProvider,
} from "../contexts/ModalNewPlayerContext";

import useGame from "../../core/hooks/useGame";

import globalStyles from "../../core/utils/styles";
import PlayerList from "../components/PlayerList";

const PlayersScreen = ({}) => {
  const { playerList } = useGame();
  const { isModalOpen, setIsModalOpen, currentPlayer, setCurrentPlayer } =
    useContext(PlayerModalContext);

  const handleOpenPlayerModal = useCallback(() => {
    setCurrentPlayer(undefined);
    setIsModalOpen(true);
  }, []);

  return (
    <MainContainer>
      <PlayerList data={playerList} handleOpenPlayerModal={handleOpenPlayerModal} />
      <PlayerModal
        currentPlayer={currentPlayer}
        openModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainContainer>
  );
};

const PlayersWithModalContext = ({
  navigation
}: any) => {
  return (
    <PlayerModalProvider>
      {/* @ts-expect-error TS(2322): Type '{ navigation: any; }' is not assignable to t... Remove this comment to see the full error message */}
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
