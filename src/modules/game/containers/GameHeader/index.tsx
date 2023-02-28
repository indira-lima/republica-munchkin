import React, { useCallback, useMemo } from "react";
import Header, { HeaderAction } from "../../../core/containers/Header";
import useAlerts from "../../../core/hooks/useAlerts";
import useGame from "../../../core/hooks/useGame";

const gameStateTitles = {
  void: undefined,
  "choosing-players": "Choose Players",
  started: "Game",
};

/**
 * Header for the game screen
 */
const GameHeader: React.FunctionComponent = () => {
  const { endGame, resetAllPlayers, gameState } = useGame();
  const { showAlert, closeAlerts } = useAlerts();

  const handleEndGame = useCallback(() => {
    showAlert("confirm", {
      title: "End Game",
      message: "Do you really want to end this game and select new players?",
      onConfirmPressed: () => {
        endGame();
        closeAlerts();
      },
    });
  }, [endGame, closeAlerts]);

  const handleResetPlayers = useCallback(() => {
    showAlert("confirm", {
      title: "Reset Game",
      message:
        "Do you really want to end this game and restart with the same players?",
      onConfirmPressed: () => {
        resetAllPlayers();
        closeAlerts();
      },
    });
  }, [resetAllPlayers, closeAlerts]);

  const actions = useMemo<HeaderAction[]>(() => {
    if (gameState !== "started") return [];

    return [
      {
        icon: "google-controller-off",
        label: "End game",
        onPress: handleEndGame,
      },
      {
        icon: "account-convert",
        label: "Reset players' status",
        onPress: handleResetPlayers,
      },
    ];
  }, [gameState, handleEndGame, handleResetPlayers]);

  return <Header title={gameStateTitles[gameState]} actions={actions} />;
};

export default GameHeader;
