import {StyleSheet} from "react-native";
import globalStyles from "../../../Utils/styles";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
		marginHorizontal: 6,
  },
  txtEdit: {
    ...globalStyles.text,
    fontSize: 26,
    color: '#fff',
  },
})

export default styles;
