import { useCallback} from "react";
import {FlatList} from "react-native-gesture-handler";

import MainContainer from "../../Components/MainContainer";
import PanelPlayer from "../../Components/Player/Panel";

import useGame from '../../Hooks/useGame'

//const { easVersion } = require('../../../config.json')

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
