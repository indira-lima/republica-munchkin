import { createContext, useState } from "react";
import { CrewMember } from "../../core/definitions";

interface CrewMemberContextValue {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  currentMember?: CrewMember;
  setCurrentMember: (member: CrewMember | undefined) => void;
}

const CrewMemberModalContext = createContext<CrewMemberContextValue>(
  {} as CrewMemberContextValue
);
export default CrewMemberModalContext;

export const CrewMemberModalProvider = ({ children }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMember, setCurrentMember] = useState<CrewMember>();

  return (
    <CrewMemberModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, currentMember, setCurrentMember }}
    >
      {children}
    </CrewMemberModalContext.Provider>
  );
};
