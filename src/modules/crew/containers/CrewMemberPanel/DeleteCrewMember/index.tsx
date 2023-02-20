import { useRef } from "react";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/trash.pn... Remove this comment to see the full error message
import imgTrash from "../../../../../../assets/icons/trash.png";
import HorizontalSwipeableActions from "../../../../core/components/SwipeableActions/Horizontal";
import { CrewMember } from "../../../../core/definitions";
import useCrew from "../../../../core/hooks/useCrew";

interface DeleteCrewMemberProps {
  crewMember: CrewMember;
  children: React.ReactNode;
}

const DeleteCrewMember: React.FunctionComponent<DeleteCrewMemberProps> = ({
  children,
  crewMember,
}) => {
  const { removeCrewMember } = useCrew();
  const swipeableRef = useRef(null);

  return (
    <HorizontalSwipeableActions
      // @ts-ignore
      ref={swipeableRef}
      left={{
        image: imgTrash,
        onPress: () => removeCrewMember(crewMember.id),
      }}
    >
      {children}
    </HorizontalSwipeableActions>
  );
};

export default DeleteCrewMember;
