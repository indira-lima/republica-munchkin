import { FlatList, View, StyleSheet } from "react-native";

import globalStyles from "../../../core/utils/styles";
import Button from "../../../core/components/Button";

import { CrewMember } from "../../../core/definitions";
import CrewMemberPanel from "../../containers/CrewMemberPanel";

interface CrewListProps {
  data: CrewMember[];
  handleOpenMemberModal: () => void;
}

const CrewList: React.FC<CrewListProps> = ({ data, handleOpenMemberModal }) => {
  return (
    <View style={styles.container}>
      <Button text="ADD MEMBER" onPress={handleOpenMemberModal} />
      <FlatList
        data={data}
				style={styles.list}
        renderItem={({ item }) => <CrewMemberPanel crewMember={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.containerBody,
    justifyContent: "flex-start",
  },
	list: {
		marginTop: 10,
	}
});

export default CrewList;
