import { createContext, useEffect, useCallback, useState } from "react";

import useSecureStorage from "../hooks/useSecureStorage";

import { Genders } from "../utils/static";
import avatarImages from "../imports/avatars";
import { CrewMember } from "../definitions";

interface CrewContextValue {
  crew: CrewMember[];
  addCrewMember: (player: CrewMember) => void;
  removeCrewMember: (id: number) => void;
  editCrewMember: (id: number, data: CrewMember) => void;
}

const CrewContext = createContext<CrewContextValue>({} as CrewContextValue);
export default CrewContext;

export const GameProvider = ({ children }: any) => {
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const { secureSave, getFromStorage } = useSecureStorage();

  useEffect(() => {
    async function initState() {
      const crew: CrewMember[] = await getFromStorage("crew");
      setCrew(crew || []);
    }

    initState();
  }, []);

  useEffect(() => {
    secureSave("crew", crew);
  }, [crew]);

  const _getCrewMemberIndexById = useCallback(
    (id: number) => {
      const index = crew.findIndex((member) => member.id === id);
      return index;
    },
    [crew]
  );

  /**
   * Validate some props of the player object before saving it
   */
  const _validateCrewMemberData = useCallback((data: any) => {
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
      // define o ID do player baseado no ID do último cadastrado,
      // usando a função last() definida no utils/functions
      // @ts-ignore
      member.id = list.length > 0 ? Number(list.last().id) + 1 : 1;

      _validateCrewMemberData(member);
      return [...list, member];
    });
  }, []);

  const removeCrewMember = useCallback(
    (id: number) => {
      const index = _getCrewMemberIndexById(id);
      if (index < 0) return;

      setCrew((list) => {
        list.splice(index, 1);
        return [...list];
      });
    },
    [_getCrewMemberIndexById]
  );

  const editCrewMember = useCallback(
    (id: number, data: CrewMember) => {
      const index = _getCrewMemberIndexById(id);
      if (index < 0) return;

      _validateCrewMemberData(data);

      setCrew((items) => {
        return [
          ...items.slice(0, index),
          { ...items[index], ...data },
          ...items.slice(index + 1),
        ];
      });
    },
    [_getCrewMemberIndexById]
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
