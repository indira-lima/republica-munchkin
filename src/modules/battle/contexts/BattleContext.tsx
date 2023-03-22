import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Player } from "../../core/definitions";
import { Monster } from "../definitions";

/**
 * void means the game hasn't started
 * choosing-players means the user is selecting the match's players
 * started means the action has began!
 */
type BattleState = "void" | "setting-modifiers" | "started";

interface BattleContextValue {
  battleState: BattleState;
  setBattleState: (state: BattleState) => void;

  mainPlayer?: Player;
  setMainPlayer: (player: Player) => void;

  allyPlayer?: Player;
  setAllyPlayer: (player?: Player) => void;

  playerBattlePoints: number;
  addPlayerBattlePoints: (points: number) => void;

  monsters: Monster[];
  addMonster: () => void;
  deleteMonster: (index: number) => void;

  monsterBattlePoints: number;
  addMonsterBattlePoints: (points: number) => void;

	resetPlayerModifiers: () => void,
	resetMonsterModifiers: () => void,
}

const BattleContext = createContext<BattleContextValue>(
  {} as BattleContextValue
);
export default BattleContext;

/**
 * The ongoing battle context
 *
 * It has one main player with zero or one ally fighting against one or more monsters
 *
 */
export const BattleProvider = ({ children }: any) => {
  const [battleState, setBattleState] = useState<BattleState>("void");

  const [mainPlayer, setMainPlayer] = useState<Player>();
  const [allyPlayer, setAllyPlayer] = useState<Player>();
  const [playerModifiers, setPlayerModifiers] = useState<number>(0);

  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [monsterModifiers, setMonsterModifiers] = useState<number>(0);

	/**
		* Total battle points of the player group
		*
		* This includes the total level and items from the main and ally players
		* plus the modifiers set for this battle
	  */
  const playerBattlePoints = useMemo(() => {
    let total = playerModifiers;

    if (mainPlayer) total += mainPlayer?.level + mainPlayer?.items;

    if (allyPlayer) total += allyPlayer?.level + allyPlayer?.items;

    return total;
  }, [mainPlayer, allyPlayer, playerModifiers]);


	/**
		* Total battle points of the monster group
		*
		* This includes the total strength of each monster
		* plus the modifiers set for this battle
	  */
  const monsterBattlePoints = useMemo(() => {
    let total = monsterModifiers;

    for (const monster of monsters) {
      total += monster.strength;
    }

    return total;
  }, [monsters, monsterModifiers]);

	/**
	 * Add (or subtract if negative) modifiers points for the player
	 * group in this battle
	 */
	const addPlayerBattlePoints = useCallback((points: number) => {
		setPlayerModifiers(current => current += points)	
	}, [])

	const resetPlayerModifiers = useCallback(() => {
		setPlayerModifiers(0)	
	}, [])

	/**
	 * Add (or subtract if negative) modifiers points for the monster
	 * group in this battle
	 */
	const addMonsterBattlePoints = useCallback((points: number) => {
		setMonsterModifiers(current => current += points)	
	}, [])

	const resetMonsterModifiers = useCallback(() => {
		setMonsterModifiers(0)	
	}, [])

	const deleteMonster = useCallback((index: number) => {
		setMonsters(list => {
			const newList = [...list];
			newList.splice(index, 1);
			return newList;
		})
	}, [])


	const addMonster = useCallback(() => {
		const monster: Monster = {
			strength: 1,
			levels: 1,
			treasures: 1,
			avatar: Math.floor(Math.random() * 9), // gets one of the 9 available avatars
		}

		setMonsters(list => [...list, monster]);
	}, [])

	useEffect(() => {
		addMonster();
	}, []);

  return (
    <BattleContext.Provider
      value={{
        battleState,
        setBattleState,
        mainPlayer,
        setMainPlayer,
        allyPlayer,
        setAllyPlayer,
        monsters,
        addMonster,
				deleteMonster,
				playerBattlePoints,
				addPlayerBattlePoints,
				monsterBattlePoints,
				addMonsterBattlePoints,
				resetPlayerModifiers,
				resetMonsterModifiers,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => {
  const battleContext = useContext(BattleContext);

  if (!battleContext.battleState) {
    throw new Error("useBattle must be used within an BattleProvider");
  }

  return battleContext;
};
