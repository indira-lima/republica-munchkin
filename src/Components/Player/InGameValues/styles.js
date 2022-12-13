import {StyleSheet} from "react-native";
import globalStyles from "../../../Utils/styles";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
		marginHorizontal: 6,
  },
  name: {
    ...globalStyles.text,
    fontSize: 20,
    color: '#fff',
  },
})

export default styles;
