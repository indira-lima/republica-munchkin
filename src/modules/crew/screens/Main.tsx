import { useCallback, useContext } from "react";
import MainContainer from "../../core/containers/MainContainer";
import ModalNewMember from "../components/ModalNewMember";

import CrewMemberModalContext, {
  CrewMemberModalProvider,
} from "../contexts/ModalNewMemberContext";

import useCrew from "../../core/hooks/useCrew";

import CrewList from "../components/CrewList";

/**
 * Crew screen
 * Renders the list of available crew members and
 * a button to add more
 *
 * The ModalNewMember is used to show all the info of the new
 * member, or one being edited
 *
 * It uses the CrewMemberModalContext to share values of the
 * member through the components
 */
const CrewScreen = ({}) => {
  const { crew } = useCrew();
  const { isModalOpen, setIsModalOpen, currentMember, setCurrentMember } =
    useContext(CrewMemberModalContext);

  const handleOpenMemberModal = useCallback(() => {
    setCurrentMember(undefined);
    setIsModalOpen(true);
  }, []);

  return (
    <MainContainer>
      <CrewList data={crew} handleOpenMemberModal={handleOpenMemberModal} />
      <ModalNewMember
        currentMember={currentMember}
        openModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainContainer>
  );
};

const PlayersWithModalContext = ({ navigation }: any) => {
  return (
    <CrewMemberModalProvider>
      {/* @ts-expect-error TS(2322): Type '{ navigation: any; }' is not assignable to t... Remove this comment to see the full error message */}
      <CrewScreen navigation={navigation}></CrewScreen>
    </CrewMemberModalProvider>
  );
};

export default PlayersWithModalContext;
