import { createContext, useState } from "react";

const ModalNewPlayerContext = createContext({});
export default ModalNewPlayerContext;

export const PlayerModalProvider = ({
  children
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  return (
    <ModalNewPlayerContext.Provider
      value={{ isModalOpen, setIsModalOpen, currentPlayer, setCurrentPlayer }}
    >
      {children}
    </ModalNewPlayerContext.Provider>
  );
};
