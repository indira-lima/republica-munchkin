import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import MainContainer from "../../core/containers/MainContainer";
import { Player } from "../../core/definitions";
import globalStyles from "../../core/utils/styles";
import PlayerBattlePanel from "../containers/PlayerBattlePanel";
import { BattleProvider, useBattle } from "../contexts/BattleContext";

/**
 * Battle screen where the action begins
 *
 * Renders the player received by the route params (not from the props
 * for it's a Screen, not a Component), the monster and other battle
 * functionalities
 *
 * Both the Player and the Monster have a panel where the logic for it's
 * "battle points" is set
 *
 * "Battle points" will be the final decisor after all the modificators were
 * used and the user chooses to end the battle
 *
 * The entity with more battle points wins (the monster wins by tying)
 */
const Battle: React.FunctionComponent = () => {
  const route = useRoute();

  const { player } = route.params as { player: Player };
  const { setMainPlayer, setBattleState } = useBattle();

  useEffect(() => {
    setMainPlayer(player);
    setBattleState("setting-modifiers");
  }, []);

  return (
    <MainContainer>
      <View style={[globalStyles.containerBody]}>
        <PlayerBattlePanel />
      </View>
    </MainContainer>
  );
};

export default () => (
  <BattleProvider>
    <Battle />
  </BattleProvider>
);
