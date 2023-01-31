import { createContext, useEffect, useCallback, useState } from "react";

import useSecureStorage from "../hooks/useSecureStorage";

import { Genders } from "../utils/static";
import avatarImages from "../imports/avatars";

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
export const GameProvider = ({
  children
}: any) => {
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
    // console.log("saving", playerList[0]);
    secureSave("playerList", playerList);
  }, [playerList]);

  const _getPlayerIndexById = useCallback(
    (id: any) => {
      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
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

  // @ts-expect-error TS(7006): Parameter 'player' implicitly has an 'any' type.
  const addPlayer = useCallback((player) => {
    // @ts-expect-error TS(2345): Argument of type '(list: never[]) => any[]' is not... Remove this comment to see the full error message
    setPlayerList((list) => {
      // define o ID do player baseado no ID do último cadastrado
      // @ts-expect-error TS(2339): Property 'last' does not exist on type 'never[]'.
      player.id = list.length > 0 ? Number(list.last().id) + 1 : 1;
      player.level = 1;
      player.items = 0;

      _validatePlayerData(player);
      return [...list, player];
    });
  }, []);

  const removePlayer = useCallback(
    // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
    (id) => {
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
    // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
    (id, data) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      _validatePlayerData(data);

      // @ts-expect-error TS(2345): Argument of type '(items: never[]) => any[]' is no... Remove this comment to see the full error message
      setPlayerList((items) => {
        return [
          ...items.slice(0, index),
          // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
          { ...items[index], ...data },
          ...items.slice(index + 1),
        ];
      });
    },
    [_getPlayerIndexById]
  );

  const levelUpPlayer = useCallback(
    // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
    (id) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      const player = playerList[index];
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      let level = player.level + 1;
      if (level >= 10) {
        level = 10;
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        player.won = true;
      } else {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        player.won = false;
      }

      editPlayer(id, { level });
    },
    [playerList, editPlayer, _getPlayerIndexById]
  );

  const levelDownPlayer = useCallback(
    // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
    (id) => {
      const index = _getPlayerIndexById(id);
      if (index < 0) return;

      const player = playerList[index];
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      let level = player.level - 1;
      if (level <= 1) {
        level = 1;
      }
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      player.won = false;

      editPlayer(id, { level });
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
