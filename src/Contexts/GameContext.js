import { createContext, useEffect, useCallback, useState } from "react";

import { Genders } from "../Utils/static";

import useSecureStorage from "../Hooks/useSecureStorage";

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

  const addPlayer = useCallback((player) => {
    setPlayerList((list) => {
      // define o ID do player baseado no ID do último cadastrado
      player.id = list.length > 0 ? Number(list.last()) + 1 : 1;
      player.level = 1;
      player.items = 0;

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
