import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { HeaderAction } from ".";
import globalStyles, { circulo, colors } from "../../utils/styles";

interface ActionItemProps {
  position: number;
  action: HeaderAction;
	closeMenu: () => void;
}

export const actionContainerSize = 36;
export const actionTranslateY = actionContainerSize + 10;
const actionShownDelay = 500;

/**
 * ActionItem documentation
 */
const ActionItem: React.FunctionComponent<ActionItemProps> = ({
  position,
  action,
	closeMenu,
}) => {
  const animation = useSharedValue(-actionTranslateY);

  useEffect(() => {
    animation.value = withDelay(
      position * actionShownDelay,
      withTiming(position * actionTranslateY)
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animation.value }],
    };
  });

	const handleActionPress = useCallback(() => {
			closeMenu();
			action.onPress();
	}, [action])

  return (
    <TouchableWithoutFeedback onPress={handleActionPress}>
      <Animated.View style={[styles.container, animatedStyles]}>
        {!!action.label && (
          <Text style={styles.actionLabel}>{action.label}</Text>
        )}
        <View style={styles.actionIconWrapper}>
          <MaterialCommunityIcons
            /* @ts-ignore */
            name={action.icon}
            size={actionContainerSize / 1.5}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: actionContainerSize / 2,

    flexDirection: "row",
    alignItems: "center",
  },
  actionIconWrapper: {
    ...circulo(actionContainerSize),
    backgroundColor: colors.background,
  },
  actionLabel: {
    ...globalStyles.text,
    color: colors.action,
    marginRight: 15,
  },
});

export default ActionItem;
