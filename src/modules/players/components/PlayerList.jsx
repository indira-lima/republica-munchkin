import { FlatList, View, StyleSheet } from "react-native";

import globalStyles from "../../core/utils/styles";
import PanelPlayer from "../../core/containers/PlayerPanel";
import Button from "../../core/components/Button";

const PlayerList = ({ data, handleAddPlayer }) => {
  return (
    <View style={styles.container}>
      <Button text="ADD PLAYER" onPress={handleAddPlayer} />
      <FlatList
        data={data}
        renderItem={({ item }) => <PanelPlayer player={item} enableEdit />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.containerBody,
    justifyContent: "flex-start",
  },
});

export default PlayerList;

