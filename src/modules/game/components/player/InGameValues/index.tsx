import { View } from "react-native";

import LevelIndicatorBars from "../../../../core/components/Player/LevelIndicatorBars";
import Name from "../../../../core/components/Player/Name";
import { Player } from "../../../../core/definitions";
import StrengthCounter from "./StrengthCounter";

import styles from "./styles";

interface InGameValuesProps {
  player: Player;
}

const InGameValues: React.FunctionComponent<InGameValuesProps> = ({
  player,
}) => {
  return (
    <View style={styles.container}>
      <Name player={player} />
      <StrengthCounter player={player} />
      <LevelIndicatorBars player={player} />
    </View>
  );
};

export default InGameValues;
