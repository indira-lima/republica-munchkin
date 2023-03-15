import React, { Fragment } from "react";
import { Text, TouchableOpacity } from "react-native";
import ThemedSVG from "../../../core/components/ThemedSVG";

// @ts-ignore
import CallAlly from "../../../../../assets/icons/CallAlly.svg";
import globalStyles from "../../../core/utils/styles";
import { battleTheme } from "../../../core/utils/themes";
import { iconsSize } from "../PlayerBattlePanel/styles";

interface ChooseAllyProps {
  // TODO: Component props
}

/**
 * ChooseAlly documentation
 */
const ChooseAlly: React.FunctionComponent<ChooseAllyProps> = () => {
  return (
    <Fragment>
      <TouchableOpacity>
        <ThemedSVG
          SVGImage={CallAlly}
          height={iconsSize}
          width={iconsSize}
          theme={battleTheme}
        />
      </TouchableOpacity>
      <Text style={globalStyles.text}>Help!</Text>
    </Fragment>
  );
};

export default ChooseAlly;
