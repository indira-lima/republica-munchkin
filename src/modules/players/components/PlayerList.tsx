import { FlatList, View, StyleSheet } from "react-native";

import globalStyles from "../../core/utils/styles";
import PanelPlayer from "../../core/containers/PlayerPanel";
import Button from "../../core/components/Button";

import { Player } from "../../core/definitions";

interface PlayerListProps {
  data: Player[];
  handleOpenPlayerModal: () => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  data,
  handleOpenPlayerModal,
}) => {
  return (
    <View style={styles.container}>
      <Button text="ADD PLAYER" onPress={handleOpenPlayerModal} />
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
