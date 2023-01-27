import { StyleSheet } from "react-native";
import globalStyles from "../../../core/utils/styles";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 6,
  },
  btnEdit: {
    flex: 1,
    justifyContent: "center",
  },
  txtEdit: {
    ...globalStyles.text,
    fontSize: 30,
    color: "#fff",
  },
});

export default styles;
