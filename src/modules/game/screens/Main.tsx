import { useCallback} from "react";
import {FlatList} from "react-native-gesture-handler";

import MainContainer from "../../core/containers/MainContainer";
import PanelPlayer from "../../core/containers/PlayerPanel";

import useGame from '../../core/hooks/useGame'

const GameScreen = () => {
  // @ts-expect-error TS(2339): Property 'playerList' does not exist on type '{}'.
  const { playerList } = useGame() 

  const renderItemPlayer = useCallback(({
      item
  }: any) => {
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
