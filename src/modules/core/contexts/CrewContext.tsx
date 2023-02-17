import { createContext, useEffect, useCallback, useState } from "react";

import useSecureStorage from "../hooks/useSecureStorage";

import { Genders } from "../utils/static";
import avatarImages from "../imports/avatars";
import { CrewMember } from "../definitions";
import useStorageUtils from "../hooks/useStorageUtils";

interface CrewContextValue {
  crew: CrewMember[];
  addCrewMember: (player: CrewMember) => void;
  removeCrewMember: (id: number) => void;
  editCrewMember: (id: number, data: CrewMember) => void;
}

const CrewContext = createContext<CrewContextValue>({} as CrewContextValue);
export default CrewContext;

/**
 * The context for handling Crew members
 *
 * The Crew is a list of playable characters created for later games,
 * with no level and items
 */
export const CrewProvider = ({ children }: any) => {
  // hooks for saving and retrieving data from the local storage
  const { secureSave, getFromStorage } = useSecureStorage();

  /** The Crew members list */
  const [crew, setCrew] = useState<CrewMember[]>([]);

  const {
    getItemIndexById: getCrewMemberIndexById,
    getNewItemId,
    removeListItem,
    editListItem,
  } = useStorageUtils<CrewMember>();

  /**
   * Retrieving data from the storage at initialization
   */
  useEffect(() => {
    async function initState() {
      const crew: CrewMember[] = await getFromStorage("crew");
      setCrew(crew || []);
    }

    initState();
  }, []);

  /**
   * Saving data to the storage everytime the playerList changes
   */
  useEffect(() => {
    secureSave("crew", crew);
  }, [crew]);

  /**
   * Validate some props of the player object before saving it
   */
  const _validateCrewMemberData = useCallback((data: CrewMember) => {
    // validate the gender value, if defined
    if (data.gender !== undefined) {
      const foundGender = Object.values(Genders).find(
        (value) => value === data.gender
      );
      data.gender = foundGender === undefined ? Genders.PAN : foundGender;
    } else {
      data.gender = Genders.PAN;
    }

    // validate the avatar value, if defined
    if (data.avatar !== undefined) {
      const foundAvatar = avatarImages[data.avatar];
      data.avatar = foundAvatar === undefined ? 0 : data.avatar;
    } else {
      data.avatar = 0;
    }
  }, []);

  const addCrewMember = useCallback((member: CrewMember) => {
    setCrew((list) => {
      _validateCrewMemberData(member);
      member.id = getNewItemId(list);
      return [...list, member];
    });
  }, []);

  const removeCrewMember = useCallback(
    (id: number) => {
      setCrew((list) => removeListItem(list, id));
    },
    []
  );

  const editCrewMember = useCallback(
    (id: number, data: CrewMember) => {
      _validateCrewMemberData(data);
      setCrew((list) => editListItem(list, id, data));
    },
    [getCrewMemberIndexById]
  );

  return (
    <CrewContext.Provider
      value={{
        crew: crew,
        addCrewMember,
        removeCrewMember,
        editCrewMember,
      }}
    >
      {children}
    </CrewContext.Provider>
  );
};
