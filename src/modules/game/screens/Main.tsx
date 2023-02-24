import { useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";

import MainContainer from "../../core/containers/MainContainer";
import PanelPlayer from "../containers/PlayerPanel";

import useGame from "../../core/hooks/useGame";

import globalStyles from "../../core/utils/styles";
import PlayersSelectionPanel from "../containers/PlayersSelectionPanel";
import BigStartButton from "../containers/BigStartButton";

/**
 * The main Game screen. It shows the appropriate content based on the game state
 * This module is dependent from the crew module and uses the useCrew hook to get
 * a list of the current crew members
 */
const GameScreen = () => {
  const { gameState, playerList } = useGame();

  const renderItemPlayer = useCallback(({ item }: any) => {
    return <PanelPlayer key={item.id} player={item} />;
  }, []);

  return (
    <MainContainer style={globalStyles.containerBody}>
      {gameState === "started" && (
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={playerList}
          renderItem={renderItemPlayer}
          keyExtractor={(_item, index) => `player ${index}`}
        />
      )}
      {gameState === "void" && (
				<BigStartButton/>
      )}
      {gameState === "choosing-players" && (
				<PlayersSelectionPanel/>
      )}
    </MainContainer>
  );
};

export default GameScreen;
