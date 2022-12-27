import { createContext, useEffect, useCallback, useState } from "react";

import { Genders } from "../Utils/static";

import useSecureStorage from "../Hooks/useSecureStorage";
import avatarImages from "../Components/Player/utils/avatars";

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
  const [playerList, setPlayerList] = useState([]);
  const { secureSave, getFromStorage, removeFromStorage } = useSecureStorage();

  useEffect(() => {
    async function initState() {
      // await removeFromStorage('playerList')
      const players = await getFromStorage("playerList");
      setPlayerList(players || []);
      // addPlayer({
      // 	name: 'Nill',
      // 	gender: Genders.FEM,
      // 	theme: 'yellow',
      // 	avatar: 'avatar_9',
      // })
    }

    initState();
  }, []);

  useEffect(() => {
    // console.log('saving', playerList[0])
    secureSave("playerList", playerList);
  }, [playerList]);

  const _getPlayerIndexById = useCallback(
    (id) => {
      const index = playerList.findIndex((p) => p.id === id);
      return index;
    },
    [playerList]
  );

	/**
	 * Validate some props of the player object before saving it
		*/
	const _validatePlayerData = useCallback(
		(data) => {
			console.log(data)

			const foundGender = Object.values(Genders).find(value => value === data.gender)
			data.gender = foundGender === undefined ? Genders.PAN : foundGender

			const foundAvatar = avatarImages[data.avatar]
			data.avatar = foundAvatar === undefined ? 0 : data.avatar

			console.log(data)
		},
		[]
	)

  const addPlayer = useCallback((player) => {
    setPlayerList((list) => {
      // define o ID do player baseado no ID do último cadastrado
      player.id = list.length > 0 ? Number(list.last().id) + 1 : 1;
      player.level = 1;
      player.items = 0;

			_validatePlayerData(player)
      return [...list, player];
    });
  }, []);

  const removePlayer = useCallback(
    (id) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      setPlayerList((list) => [...list.splice(index, 1)]);
    },
    [playerList]
  );

  const editPlayer = useCallback(
    (id, data) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

			_validatePlayerData(data)

      setPlayerList((items) => [
        ...items.slice(0, index),
        { ...items[index], ...data },
        ...items.slice(index + 1),
      ]);
    },
    [playerList]
  );

  const levelUpPlayer = useCallback(
    (id) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      const player = playerList[index];
      let level = player.level + 1;
      if (level >= 10) {
        level = 10;
        player.won = true;
      } else {
        player.won = false;
      }

      editPlayer(id, { level });
    },
    [playerList, editPlayer]
  );

  const levelDownPlayer = useCallback(
    (id) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      const player = playerList[index];
      let level = player.level - 1;
      if (level <= 1) {
        level = 1;
      }
      player.won = false;

      editPlayer(id, { level });
    },
    [playerList, editPlayer]
  );

  return (
    <GameContext.Provider
      value={{
        playerList,
        addPlayer,
        removePlayer,
        editPlayer,
        levelUpPlayer,
        levelDownPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
