import { FlatList, View } from "react-native";

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
    )
}

export default PlayerList;