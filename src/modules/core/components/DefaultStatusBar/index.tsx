import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { colors } from "../../utils/styles";

const DefaultStatusBar = () => {
  const isFocused = useIsFocused();

  if (!isFocused) return null;
  return (
    <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
  );
};

export default DefaultStatusBar;
