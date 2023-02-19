import { StyleSheet } from "react-native";
import globalStyles, { colors } from "../../utils/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...globalStyles.flexCenter,
  },
  crewSelectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingBottom: 12,
    marginBottom: 12,
    width: "100%",
    padding: 15,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: `${colors.action}25`,
  },
});

export default styles;
