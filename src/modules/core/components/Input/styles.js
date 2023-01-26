import { StyleSheet } from "react-native";
import globalStyles, { fonts } from "../../utils/styles";

const input = {
  ...globalStyles.text,
  fontSize: 20,
  height: 40,
  backgroundColor: "transparent",
  borderBottomColor: "#fff",
  borderBottomWidth: 1,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    position: "relative",
    ...globalStyles.row,
  },
  input: {
    ...input,
  },
  inputBorderless: input,
  iconInput: {
    ...input,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  error: {
    borderColor: "red",
  },
  errorMessage: {
    ...globalStyles.text,
    fontSize: fonts.small,
    color: "red",
    position: "absolute",
    left: 15,
    top: "100%",
  },
  label: {
    ...globalStyles.text,
    fontSize: input.fontSize,
    marginLeft: 5,
  },
  itemPicker: {
    ...globalStyles.text,
  },
});

export default styles;

