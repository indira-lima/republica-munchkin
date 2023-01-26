import { View } from "react-native";

import LevelIndicatorBars from "../../../../core/components/Player/LevelIndicatorBars";
import Name from "../../../../core/components/Player/Name";
import StrengthCounter from "./StrengthCounter";

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
