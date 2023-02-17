import { createContext, useEffect, useCallback, useState } from "react";

import useSecureStorage from "../hooks/useSecureStorage";

import { Player } from "../definitions";

interface GameContextValue {
  playerList: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  editPlayer: (id: number, data: Player) => void;
  levelUpPlayer: (id: number) => void;
  levelDownPlayer: (id: number) => void;
}

const GameContext = createContext<GameContextValue>({} as GameContextValue);
export default GameContext;

/**
 * The ongoing game context
 *
 * Uses a subset of the Crew list with a minimum of 3 and a maximum of 6
 * players, which have the crew member's info with the addition of level,
 * items and whether they won the match
 */
export const GameProvider = ({ children }: any) => {
	// hooks for saving and retrieving data from the local storage
  const { secureSave, getFromStorage } = useSecureStorage();

	/** The match's player list */
  const [playerList, setPlayerList] = useState<Player[]>([]);

	/**
	 * Retrieving data from the storage at initialization
	 */
  useEffect(() => {
    async function initState() {
      const players: Player[] = await getFromStorage("playerList");
      setPlayerList(players || []);
    }

    initState();
  }, []);

	/**
	 * Saving data to the storage everytime the playerList changes
	 */
  useEffect(() => {
    secureSave("playerList", playerList);
  }, [playerList]);

	/**
	 * Method to find a player index inside the playerList by its ID
	 */
  const _getPlayerIndexById = useCallback(
    (id: number) => {
      const index = playerList.findIndex((p) => p.id === id);
      return index;
    },
    [playerList]
  );

  const addPlayer = useCallback((player: Player) => {
    setPlayerList((list) => {
      // define o ID do player baseado no ID do último cadastrado,
			// usando a função last() definida no utils/functions
      // @ts-ignore
      player.id = list.length > 0 ? Number(list.last().id) + 1 : 1;
      player.level = 1;
      player.items = 0;
			player.won = false;

      return [...list, player];
    });
  }, []);

	/**
	 * Delete a player from the game by its ID
	 */
  const removePlayer = useCallback(
    (id: number) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      setPlayerList((list) => {
        list.splice(index, 1);
        return [...list];
      });
    },
    [_getPlayerIndexById]
  );

	/**
	 * Find a player by its ID and apply all props from `data`
	 */
  const editPlayer = useCallback(
    (id: number, data: Player) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      setPlayerList((items) => {
        return [
          ...items.slice(0, index),
          { ...items[index], ...data },
          ...items.slice(index + 1),
        ];
      });
    },
    [_getPlayerIndexById]
  );

  const levelUpPlayer = useCallback(
    (id: number) => {
      const index = _getPlayerIndexById(id);

      const player = playerList[index];
      if (player === undefined) return;

      let level = player.level ? player.level + 1 : 1;
      if (level >= 10) {
        level = 10;
        player.won = true;
      } else {
        player.won = false;
      }

      editPlayer(id, { ...player, level });
    },
    [playerList, editPlayer, _getPlayerIndexById]
  );

  const levelDownPlayer = useCallback(
    (id: number) => {
      const index = _getPlayerIndexById(id);

      const player = playerList[index];
      if (player === undefined) return;

      let level = player.level ? player.level - 1 : 1;
      if (level <= 1) {
        level = 1;
      }
      player.won = false;

      editPlayer(id, { ...player, level });
    },
    [playerList, editPlayer, _getPlayerIndexById]
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
