import { StyleSheet } from "react-native";
import globalStyles, { colors } from "../../utils/styles";
import {actionContainerSize} from "./ActionItem";

export const HEADER_HEIGHT = 65;
export const actionsIconSize = 36;

const borderRadius = 12;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: actionsIconSize,

    width: "100%",
    height: HEADER_HEIGHT,
    backgroundColor: colors.header,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    position: "relative",
  },
  actionButton: {
    position: "absolute",
    right: actionContainerSize/2,
    top: "50%",
    transform: [{ translateY: -actionsIconSize / 2 }],
  },
  headerTitle: {
    ...globalStyles.text,
    color: colors.secondary,
    textTransform: "uppercase",
    textShadowColor: colors.action,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontSize: 25,
  },
});

export default styles;
