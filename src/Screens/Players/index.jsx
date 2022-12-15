import { View } from "react-native";
import {FlatList} from "react-native-gesture-handler";

import Button from "../../Components/Button";
import MainContainer from "../../Components/MainContainer";
import PanelPlayer from "../../Components/Player/Panel";

import useGame from "../../Hooks/useGame";

import styles from "./styles";

const PlayersScreen = ({}) => {
	const { playerList } = useGame();

  return (
    <MainContainer>
      <View style={styles.container}>
        <Button text="ADD PLAYER" />
				<FlatList
					data={playerList}
					renderItem={({ item }) => <PanelPlayer player={item} enableEdit />}
				/>
      </View>
			{/* TODO: Add Player Modal */}
    </MainContainer>
  );
};

export default PlayersScreen;
