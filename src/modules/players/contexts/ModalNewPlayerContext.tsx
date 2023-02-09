import { createContext, useState } from "react";
import { Player } from "../../core/definitions";

interface ModalNewPlayerContextValue {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  currentPlayer?: Player;
	setCurrentPlayer: (player: Player | undefined) => void,
}

const ModalNewPlayerContext = createContext<ModalNewPlayerContextValue>({} as ModalNewPlayerContextValue);
export default ModalNewPlayerContext;

export const PlayerModalProvider = ({ children }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();

  return (
    <ModalNewPlayerContext.Provider
      value={{ isModalOpen, setIsModalOpen, currentPlayer, setCurrentPlayer }}
    >
      {children}
    </ModalNewPlayerContext.Provider>
  );
};
