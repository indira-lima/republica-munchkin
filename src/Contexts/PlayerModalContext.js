import { createContext, useState } from "react";

const PlayerModalContext = createContext({});
export default PlayerModalContext;

export const PlayerModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  return (
    <PlayerModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, currentPlayer, setCurrentPlayer }}
    >
      {children}
    </PlayerModalContext.Provider>
  );
};
