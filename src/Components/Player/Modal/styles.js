import { StyleSheet } from "react-native";
import globalStyles from "../../../Utils/styles";

const styles = StyleSheet.create({
  title: {
    ...globalStyles.text,
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 15,
    // borderColor: 'red', borderWidth: 1,
  },
  rowButtons: {
    justifyContent: "flex-end",
    width: "100%",
  },
	formContent: {
		justifyContent: 'center',
		alignItems: 'center'
	},
  inputSession: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
  },
});

export default styles;
