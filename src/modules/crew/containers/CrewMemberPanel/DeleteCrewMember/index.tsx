import { useCallback, useRef } from "react";

// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/trash.pn... Remove this comment to see the full error message
import imgTrash from "../../../../../../assets/icons/trash.png";
import HorizontalSwipeableActions from "../../../../core/components/SwipeableActions/Horizontal";
import { CrewMember } from "../../../../core/definitions";
import useCrew from "../../../../core/hooks/useCrew";

interface DeleteCrewMemberProps {
  crewMember: CrewMember;
  children: React.ReactNode;
}

/**
 * Horizontal actions used to wrap the CrewMemberPanel and add
 * the Delete option when the user swipes the container
 */
const DeleteCrewMember: React.FunctionComponent<DeleteCrewMemberProps> = ({
  children,
  crewMember,
}) => {

	// get the delete function from the crew context
  const { removeCrewMember } = useCrew();
  const swipeableRef = useRef(null);

	/**
	 * Callback called when the user presses the image
	 * rendered by the swipeable after swipeing to right 
	 *
	 * It deletes the associated crew member of the panel
	 */
	const handleOnPressSwipeable = useCallback(() => {
		removeCrewMember(crewMember.id)
	}, [removeCrewMember])

  return (
    <HorizontalSwipeableActions
      // @ts-ignore
      ref={swipeableRef}
      left={{
        image: imgTrash,
        onPress: handleOnPressSwipeable,
      }}
    >
      {children}
    </HorizontalSwipeableActions>
  );
};

export default DeleteCrewMember;
