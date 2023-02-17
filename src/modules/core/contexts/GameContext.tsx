import { createContext, useEffect, useCallback, useState } from "react";

import useSecureStorage from "../hooks/useSecureStorage";

import { CrewMember, Player } from "../definitions";
import useStorageUtils from "../hooks/useStorageUtils";

interface GameContextValue {
  isGameInProgress: boolean;
  createNewGame: (members: CrewMember[]) => void;
  playerList: Player[];
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

  const {
    getItemIndexById: _getPlayerIndexById,
		getNewItemId,
    editListItem,
    removeListItem,
  } = useStorageUtils<Player>();

  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);

  /** The match's player list */
  const [playerList, setPlayerList] = useState<Player[]>([]);

  /**
   * Retrieving data from the storage at initialization
   */
  useEffect(() => {
    async function initState() {
      const isGameInProgress: boolean = await getFromStorage(
        "isGameInProgress"
      );
      if (isGameInProgress) {
        const players: Player[] = await getFromStorage("playerList");
        setPlayerList(players || []);
      }
      setIsGameInProgress(isGameInProgress);
    }

    initState();
  }, []);

  /**
   * Saving data to the storage everytime the playerList changes
   */
  useEffect(() => {
    secureSave("isGameInProgress", isGameInProgress);
    if (isGameInProgress) {
      secureSave("playerList", playerList);
    }
  }, [isGameInProgress, playerList]);

	const createNewGame = useCallback((members: CrewMember[]) => {
		if (members.length < 3)
			throw new Error("A game must have at least 3 players");
		if (members.length > 6)
			throw new Error("A game must have a maximum of 6 players");

		const playerList: Player[] = [];
		members.forEach(member => {
			const player: Player = {
				id: getNewItemId(playerList),
				level: 1,
				items: 0,
				won: false,
				memberInfo: member,
			}

			playerList.push(player);
		});

		setPlayerList(playerList);
		setIsGameInProgress(true);
	}, []);

  /**
   * Delete a player from the game by its ID
   */
  const removePlayer = useCallback(
    (id: number) => {
      setPlayerList((list) => removeListItem(list, id));
    },
    [_getPlayerIndexById]
  );

  /**
   * Find a player by its ID and apply all props from `data`
   */
  const editPlayer = useCallback(
    (id: number, data: Player) => {
      setPlayerList((list) => editListItem(list, id, data));
    },
    [_getPlayerIndexById]
  );

  const levelUpPlayer = useCallback(
    (id: number) => {
      const index = _getPlayerIndexById(playerList, id);

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
      const index = _getPlayerIndexById(playerList, id);

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
				isGameInProgress,
				createNewGame,
        playerList,
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
