import { StyleSheet } from "react-native";
import globalStyles from "../../../../core/utils/styles";
import { monsterBattlePanelContentWidth } from "../styles";

export const modifierSize = monsterBattlePanelContentWidth * 0.06;
export const mainColumnContentSize = monsterBattlePanelContentWidth * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    justifyContent: "center",
    width: monsterBattlePanelContentWidth * 0.1,
  },
  mainConlumn: {
    width: monsterBattlePanelContentWidth * 0.25,
    position: "relative",
  },
  mainColumnContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: mainColumnContentSize,
  },
  modifierButton: {
    marginVertical: 2,
  },
  modifierText: {
    ...globalStyles.text,
    fontSize: modifierSize,
    textAlign: "center",
		textAlignVertical: "center",
  },
  totalPoints: {
    ...globalStyles.text,
    fontSize: mainColumnContentSize,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default styles;
