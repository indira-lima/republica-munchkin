import { View, StyleSheet } from "react-native"

const PlayerLevelBars = ({ player, theme }) => {
  return (
    <View style={styles.container}>
      {[...Array(player.level || 1)].map((_, i) => (
        <View key={String(i)} style={styles.levelBarWrapper}>
          <View
            style={[
              styles.levelBar,
              {
                backgroundColor: theme.colors.secondary,
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 20,
  },
  levelBarWrapper: {
    width: "10%",
    height: "100%",
    paddingHorizontal: 2,
  },
  levelBar: {
    height: "100%",
  },
});

export default PlayerLevelBars;
