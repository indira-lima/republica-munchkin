import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../../core/components/Button";
import AnimatedPanel from "../../../core/containers/AnimatedPanel";
import { CrewMember } from "../../../core/definitions";
import GameConfig from "../../../core/game_config.json";
import useCrew from "../../../core/hooks/useCrew";
import useGame from "../../../core/hooks/useGame";
import SelectableMember from "../SelectableMember";

interface PlayersSelectionPanelProps {
  // nothing
}

/**
 * Panel for selecting 3 to 6 players out of the Crew members list
 */
const PlayersSelectionPanel: React.FunctionComponent<
  PlayersSelectionPanelProps
> = () => {
  const { crew } = useCrew();
  const { setGameState } = useGame();
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [selectedMembers, setSelectedMembers] = useState<CrewMember[]>([]);

  const toggleMemberSelected = useCallback(
    (member: CrewMember) => {
      if (selectedMembers.includes(member)) {
        setSelectedMembers((list) => {
          return list.filter((m) => m.id !== member.id);
        });
      } else {
        if (selectedMembers.length >= GameConfig.max_players) return;
        setSelectedMembers((list) => [...list, member]);
      }
    },
    [selectedMembers]
  );

  /** Animate back to void state */
  const handleBackToVoid = useCallback(() => {
    setGameState("void");
  }, []);

  const renderCrewMember = useCallback(
    (member: CrewMember) => {
      const isSelected = selectedMembers.includes(member);
      return (
        <SelectableMember
          member={member}
          key={member.id}
          onPress={toggleMemberSelected}
          isSelected={isSelected}
        />
      );
    },
    [selectedMembers]
  );

  return (
    <AnimatedPanel isPanelOPen={isPanelOpen} onClose={handleBackToVoid}>
      {crew.map(renderCrewMember)}

      <View style={styles.cancelButton}>
        <Button text="CANCEL" onPress={() => setIsPanelOpen(false)} />
      </View>
    </AnimatedPanel>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default PlayersSelectionPanel;
