import { useCallback} from "react";
import {FlatList} from "react-native-gesture-handler";

import MainContainer from "../../core/containers/MainContainer";
import PanelPlayer from "../../core/containers/PlayerPanel";

import useGame from '../../hooks/useGame'

const GameScreen = () => {
  const { playerList } = useGame() 

  const renderItemPlayer = useCallback(({ item }) => {
      return <PanelPlayer key={item.id} player={item} />
  }, [])

	return (
		<MainContainer>
			<FlatList
				contentContainerStyle={{ alignItems: 'center' }}
        data={playerList}
        renderItem={renderItemPlayer}
        keyExtractor={(_item, index) => `player ${index}`}
      />
		</MainContainer>
	)
}

export default GameScreen
