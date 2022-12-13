import { View } from "react-native";

import LevelIndicatorBars from "../LevelIndicatorBars";
import Name from "../Name";
import StrengthCounter from "../StrengthCounter";

import styles from "./styles";

const InGameValues = ({ player }) => {
  return (
    <View style={styles.container}>
			<Name player={player}/>
      <StrengthCounter {...playerThemeProps} />
      <LevelIndicatorBars {...playerThemeProps} />
    </View>
  );
};

export default InGameValues;
