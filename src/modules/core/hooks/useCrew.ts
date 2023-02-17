import { useContext } from "react";
import CrewContext from "../contexts/CrewContext";

function useCrew() {
	const crewContext = useContext(CrewContext);

	if (!crewContext.addCrewMember) {
		throw new Error('useCrew must be used within an CrewProvider');
	}

	return crewContext;
}

export default useCrew;

