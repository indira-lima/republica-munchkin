import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Player } from "../../core/definitions";

/**
 * Battle screen where the action begins
 *
 * Should receive an InGamePlayer (or something like that)
 * after separating the Players and Game contexts
 */
const Battle: React.FunctionComponent = () => {
  const route = useRoute();

  const { player } = route.params as { player: Player };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Hello, {player?.memberInfo.name}, time for some battle!!</Text>
    </View>
  );
};

export default Battle;
