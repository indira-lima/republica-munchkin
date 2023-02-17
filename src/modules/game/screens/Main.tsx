import { useCallback } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";
import { FlatList } from "react-native-gesture-handler";

import MainContainer from "../../core/containers/MainContainer";
import PanelPlayer from "../containers/PlayerPanel";

import useGame from "../../core/hooks/useGame";

// @ts-ignore
import BigStartButton from "../../../../assets/BigStartButton.png";
import useCrew from "../../core/hooks/useCrew";

const GameScreen = () => {
  const { crew } = useCrew();
  const { isGameInProgress, createNewGame, playerList } = useGame();

  const handleStart = useCallback(() => {
    createNewGame([ crew[0]!, crew[0]!, crew[0]! ]);
  }, []);

  const renderItemPlayer = useCallback(({ item }: any) => {
    return <PanelPlayer key={item.id} player={item} />;
  }, []);

  return (
    <MainContainer>
      {isGameInProgress && (
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={playerList}
          renderItem={renderItemPlayer}
          keyExtractor={(_item, index) => `player ${index}`}
        />
      )}
      {!isGameInProgress && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableWithoutFeedback onPress={handleStart}>
            <FastImage
              source={BigStartButton}
              style={{ width: 250, height: 250 }}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
    </MainContainer>
  );
};

export default GameScreen;
