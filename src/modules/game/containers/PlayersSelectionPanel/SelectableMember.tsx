import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { CrewMember } from "../../../core/definitions";

interface SelectableMemberProps {
  member: CrewMember;
}

/**
 * Component that shows the info of a crew member and let it
 * available for selection in the choosing-players game state
 *
 * TODO: Component style and member selection
 */
const SelectableMember: React.FunctionComponent<SelectableMemberProps> = ({
  member,
}) => {
  useEffect(() => {
    console.log("rendering:", member.name);
  }, []);

  return (
    <View
      style={{
        padding: 5,
        borderWidth: 2,
        borderColor: member.theme.colors.primary,
      }}
    >
      <Text style={{ color: "#FFF" }}>{member.name}</Text>
    </View>
  );
};

export default SelectableMember;
