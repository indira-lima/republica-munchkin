import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  LightSpeedInLeft,
  LightSpeedInRight,
  LightSpeedOutLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import Button from "../../../core/components/Button";
import AnimatedPanel from "../../../core/containers/AnimatedPanel";
import { CrewMember } from "../../../core/definitions";
import GameConfig from "../../../core/game_config.json";
import useCrew from "../../../core/hooks/useCrew";
import useGame from "../../../core/hooks/useGame";
import globalStyles from "../../../core/utils/styles";
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
  const { setGameState, createNewGame } = useGame();
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  const [selectedMembers, setSelectedMembers] = useState<CrewMember[]>([]);
  const [canStartGame, setCanStartGame] = useState<boolean>(false);

  /**
   * Check if the game can be started based on the number
   * of selected players
   */
  useEffect(() => {
    const canStart =
      selectedMembers.length >= GameConfig.min_players &&
      selectedMembers.length <= GameConfig.max_players;
    setCanStartGame(canStart);
  }, [selectedMembers]);

  const notifyPartyFull = useCallback(() => {
    console.log("Party full!!");
  }, []);

  /**
   * Mark a member a [un]selected
   */
  const toggleMemberSelected = useCallback(
    (member: CrewMember) => {
      if (selectedMembers.includes(member)) {
        // remove from the list if already selected
        setSelectedMembers((list) => {
          return list.filter((m) => m.id !== member.id);
        });
      } else {
        // add to the list if there's space
        if (selectedMembers.length >= GameConfig.max_players) {
          notifyPartyFull();
          return;
        }
        setSelectedMembers((list) => [...list, member]);
      }
    },
    [selectedMembers]
  );

  /** Animate back to void state */
  const handleBackToVoid = useCallback(() => {
    setGameState("void");
  }, []);

  /** Create a new game with the selected members */
  const handleStartGame = useCallback(() => {
    createNewGame(selectedMembers);
  }, [selectedMembers]);

  /** Check if the member is selected and render the SelectableMember component */
  const renderCrewMember = useCallback(
    ({ item: member }: ListRenderItemInfo<CrewMember>) => {
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
    <View>
      {/* Back button to reset the gameState to "void" */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => setIsPanelOpen(false)}>
          <Text style={styles.backButton}>{"< Back"}</Text>
        </TouchableOpacity>
      </View>

      {/* Renders the playerList inside an AnimatedPanel */}
      <AnimatedPanel isPanelOPen={isPanelOpen} onClose={handleBackToVoid}>
        <FlatList data={crew} renderItem={renderCrewMember} />

        {/*
					Start Game button. The text inside the button is animated
					using Animated.Text and the gameState prop
				*/}
        <View style={styles.startButton}>
          {/* The button is disabled if the game cannot be started */}
          <Button disabled={!canStartGame} onPress={handleStartGame}>
            {/* Show "START" if the game can be started */}
            {canStartGame && (
              <Animated.Text
                entering={LightSpeedInLeft}
                exiting={LightSpeedOutLeft}
                style={globalStyles.text}
              >
                START
              </Animated.Text>
            )}
            {/* Show a help message if the game cannot be started */}
            {!canStartGame && (
              <Animated.Text
                entering={LightSpeedInRight}
                exiting={LightSpeedOutRight}
                style={globalStyles.text}
              >
                {`Select ${GameConfig.min_players} to ${GameConfig.max_players} players`}
              </Animated.Text>
            )}
          </Button>
        </View>
      </AnimatedPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  backButton: {
    ...globalStyles.text,
    fontSize: 22,
  },
  startButton: {
    marginTop: 15,
    justifyContent: "flex-end",
  },
});

export default PlayersSelectionPanel;
