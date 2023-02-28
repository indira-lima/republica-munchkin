import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import globalStyles, { colors } from "../../utils/styles";

import { version } from "../../../../app_config.json";

type LinkConfig = {
  active: boolean;
  onPress: () => void;
};

interface FooterItem extends LinkConfig {
  order: number;
  label: string;
  icon: string;
}

const Footer = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();

  /**
   * Return an object to configure a footer item with navigation action
   */
  const getLinkConfig = useCallback(
    (routeName: string, params = {}): LinkConfig => {
      return {
        active: route.name === routeName,
        onPress: () => {
          // @ts-ignore
          navigation.navigate(routeName, params);
        },
      };
    },
    [route, navigation]
  );

  const footerItems = useMemo<FooterItem[]>(
    () => [
      {
        order: 1,
        label: "Game",
        icon: "game-controller",
        ...getLinkConfig("Game"),
      },
      {
        order: 2,
        label: "Crew",
        icon: "people",
        ...getLinkConfig("Crew"),
      },
    ],
    [navigation, getLinkConfig]
  );

  return (
    <View style={styles.footerContainer}>
      <View style={styles.tabBar}>
        {footerItems
          // @ts-ignore
          .sortBy("order")
          .map(({ label, icon, onPress, active = false }: FooterItem) => (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityLabel={label}
              style={[styles.tabBarButton]}
              onPress={onPress}
              disabled={active}
            >
              <IonIcons
                // @ts-ignore
                name={icon}
                size={iconSize}
                color={active ? colors.primary : colors.text}
              />
            </TouchableOpacity>
          ))}
      </View>
      <Text style={styles.versionText}>{version}</Text>
    </View>
  );
};

const iconSize = 36;
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: `${colors.primary}50`,
    marginTop: 10,
    paddingBottom: 4,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  tabBarButton: {
    alignItems: "center",
  },
  tabBarButtonLabel: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
  },
  versionText: {
    ...globalStyles.text,
    fontSize: 10,
  },
});

export default Footer;
