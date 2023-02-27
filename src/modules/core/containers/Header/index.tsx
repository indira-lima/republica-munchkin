import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/styles";
import ActionsMenu from "./ActionsMenu";
import styles, { actionsIconSize } from "./styles";

export type HeaderAction = {
  icon: string;
  label?: string;
  onPress: () => void;
};

interface HeaderProps {
  actions?: HeaderAction[];
  title?: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title = "Star Munchkin",
  actions,
}) => {
  const hasActions = useMemo<boolean>(() => {
    return actions?.length! > 0;
  }, [actions]);

  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState<boolean>(false);
  const toggleIsMenuOpen = useCallback(() => {
    setIsActionsMenuOpen((current) => !current);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
      {hasActions && (
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={toggleIsMenuOpen}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={actionsIconSize}
            color={colors.action}
          />
        </TouchableOpacity>
      )}
      {hasActions && (
        <ActionsMenu
          actions={actions!}
          isOpen={isActionsMenuOpen}
          closeMenu={() => setIsActionsMenuOpen(false)}
        />
      )}
    </View>
  );
};

export default Header;
