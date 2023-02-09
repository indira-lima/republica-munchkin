import { createContext, useEffect, useCallback, useState } from "react";

import useSecureStorage from "../hooks/useSecureStorage";

import { Genders } from "../utils/static";
import avatarImages from "../imports/avatars";
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

export const GameProvider = ({ children }: any) => {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const { secureSave, getFromStorage } = useSecureStorage();

  useEffect(() => {
    async function initState() {
      const players: Player[] = await getFromStorage("playerList");
      setPlayerList(players || []);
    }

    initState();
  }, []);

  useEffect(() => {
    secureSave("playerList", playerList);
  }, [playerList]);

  const _getPlayerIndexById = useCallback(
    (id: number) => {
      const index = playerList.findIndex((p) => p.id === id);
      return index;
    },
    [playerList]
  );

  /**
   * Validate some props of the player object before saving it
   */
  const _validatePlayerData = useCallback((data: any) => {
    // validate the gender value, if defined
		if (data.gender !== undefined) {
			const foundGender = Object.values(Genders).find(
				(value) => value === data.gender
			);
			data.gender = foundGender === undefined ? Genders.PAN : foundGender;
		}

    // validate the avatar value, if defined
		if (data.avatar !== undefined) {
			const foundAvatar = avatarImages[data.avatar];
			data.avatar = foundAvatar === undefined ? 0 : data.avatar;
		}
  }, []);

  const addPlayer = useCallback((player: Player) => {
    setPlayerList((list) => {
      // define o ID do player baseado no ID do último cadastrado,
			// usando a função last() definida no utils/functions
      // @ts-ignore
      player.id = list.length > 0 ? Number(list.last().id) + 1 : 1;
      player.level = 1;
      player.items = 0;
			player.won = false;

      _validatePlayerData(player);
      return [...list, player];
    });
  }, []);

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

  const editPlayer = useCallback(
    (id: number, data: Player) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      _validatePlayerData(data);

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
