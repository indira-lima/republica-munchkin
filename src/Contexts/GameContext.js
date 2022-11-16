import { createContext, useEffect, useCallback, useState } from "react";

import { Genders } from '../Utils/static'

import useSecureStorage from '../Hooks/useSecureStorage'

const GameContext = createContext({});
export default GameContext;

/**
 *  Player object: {
 *    id: 1,
 *    name: 'Xena, the Warrior',
 *    level: 2,
 *    items: 40,
 *    gender: Genders.ENBY,
 *    theme: 'purple',
 *    avatar: image,
 *  }
 */
export const GameProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([])
  const { secureSave, getFromStorage } = useSecureStorage()

  useEffect(() => {
		async function initState () {
			const players = await getFromStorage('playerList')
			setPlayerList(players || [])
			// addPlayer({
			// 	id: 1,
			// 	name: 'Tanbohe',
			// 	level: 3,
			// 	items: 39,
			// 	gender: Genders.AGENDER,
			// 	theme: 'purple',
			// 	avatar: 'avatar_2',
			// })
		}

		initState()
  },[])

  useEffect(() => {
    console.log('saving list to storage with', playerList.length, 'items')
    secureSave('playerList', playerList)
  },[playerList])

  const addPlayer = useCallback(player => {
    setPlayerList(list => {
      // define o ID do player baseado no ID do último cadastrado
      player.id = list.length > 0
        ? Number(list.last()) + 1
        : 1

      return [...list, player]
    })
  }, [])

  const removePlayer = useCallback((id) => {
    const index = playerList.findIndex(p => p.id === id)
    if (index < 0) return

    setPlayerList(list => [ 
      ...list.splice(index, 1)
		])

  }, [playerList])

  const editPlayer = useCallback((id, data) => {
    const index = playerList.findIndex(p => p.id == id)
    if (index < 0) return
		
    setPlayerList(items => [
				...items.slice(0, index),
				{ ...items[index], ...data },
				...items.slice(index + 1),
		])
  }, [playerList])

	return (
		<GameContext.Provider value={{
        playerList,
        addPlayer,
        removePlayer,
        editPlayer,
		}}>
			{children}
		</GameContext.Provider>
	);
}
