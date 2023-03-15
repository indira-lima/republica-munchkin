import { createContext, useContext, useState } from "react";

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
  setAllyPlayer: (player: Player) => void;

  monsters: Monster[];
  setMonsters: (monsters: Monster[]) => void;
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
  const [monsters, setMonsters] = useState<Monster[]>([]);

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
        setMonsters,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => {
	const battleContext = useContext(BattleContext);

	if (!battleContext.battleState) {
		throw new Error('useBattle must be used within an BattleProvider');
	}

	return battleContext;
}
