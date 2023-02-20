import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import useCrew from "../../../core/hooks/useCrew";
import Button from "../../../core/components/Button";
import useGame from "../../../core/hooks/useGame";
import SelectableMember from "../SelectableMember";
import AnimatedPanel from "../../../core/containers/AnimatedPanel";

interface PlayersSelectionPanelProps {
  // nothing
}

/**
 * Panel for selecting 3 to 6 players out of the Crew members list
 *
	 * TODO: context for selected members
 */
const PlayersSelectionPanel: React.FunctionComponent<
  PlayersSelectionPanelProps
> = () => {
  const { crew } = useCrew();
  const { setGameState } = useGame();
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);

  /** Animate back to void state */
  const handleBackToVoid = useCallback(() => {
    setGameState("void");
  }, []);

  return (
    <AnimatedPanel isPanelOPen={isPanelOpen} onClose={handleBackToVoid}>
      {crew.map((member) => {
        return <SelectableMember member={member} key={member.id} />;
      })}

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
