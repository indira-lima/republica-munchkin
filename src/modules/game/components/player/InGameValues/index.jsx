import { View } from "react-native";

import LevelIndicatorBars from "../LevelIndicatorBars";
import Name from "../Name";
import StrengthCounter from "../StrengthCounter";

import styles from "./styles";

const InGameValues = ({ ...playerThemeProps }) => {
  return (
    <View style={styles.container}>
			<Name {...playerThemeProps}/>
      <StrengthCounter {...playerThemeProps} />
      <LevelIndicatorBars {...playerThemeProps} />
    </View>
  );
};

export default InGameValues;
