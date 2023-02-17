import { useContext } from "react";
import GameContext from "../contexts/GameContext";

function useGame() {
	const gameContext = useContext(GameContext);

	if (!gameContext.createNewGame) {
		throw new Error('useGame must be used within an GameProvider');
	}

	return gameContext;
}

export default useGame;
