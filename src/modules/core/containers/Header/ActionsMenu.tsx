import React, { Fragment, useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { HeaderAction } from ".";
import GradientBackground, {
  Gradients,
} from "../../components/GradientBackground";
import { colors, vh } from "../../utils/styles";
import ActionItem, { actionTranslateY } from "./ActionItem";

interface ActionsMenuProps {
  actions: HeaderAction[];
  isOpen: boolean;
  closeMenu: () => void;
}

/**
 * Menu view for actions rendered by the Header
 */
const ActionsMenu: React.FunctionComponent<ActionsMenuProps> = ({
  actions,
  isOpen,
  closeMenu,
}) => {
  const renderAction = useCallback(
    (action: HeaderAction, index: number) => {
      return (
        <ActionItem
          key={index}
          action={action}
          position={index}
          closeMenu={closeMenu}
        />
      );
    },
    [closeMenu]
  );

  const actionsMenuHeight = useMemo<number>(() => {
    return actions.length * actionTranslateY;
  }, [actions]);

  if (!isOpen) return null;
  return (
    isOpen && (
      <Animated.View
        style={styles.container}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <GradientBackground colors={Gradients.Dark} />
        <View style={[styles.menuContainer, { height: actionsMenuHeight }]}>
          {actions.map(renderAction)}
        </View>
        <TouchableOpacity
          style={[StyleSheet.absoluteFillObject, { top: actionsMenuHeight }]}
          onPress={closeMenu}
          activeOpacity={1}
        >
          <Fragment/>
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "100%",
    right: 0,
    left: 0,
    height: vh(100),
  },
  menuContainer: {
    overflow: "hidden",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  actionLabel: {
    color: colors.text,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "#000000f2",
  },
});

export default ActionsMenu;
