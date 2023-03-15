import React, { Fragment } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AvatarImage from "../../../core/components/AvatarImage";
import ThemedSVG from "../../../core/components/ThemedSVG";
import { Player } from "../../../core/definitions";
import { GenderLabels } from "../../../core/utils/static";
import globalStyles from "../../../core/utils/styles";


// @ts-ignore
import CallAlly from "../../../../../assets/icons/CallAlly.svg";
import {battleTheme} from "../../../core/utils/themes";
import { iconsSize } from "../PlayerBattlePanel/styles";

interface AvatarProps {
  player?: Player;
  isAlly?: boolean;
}

const avatarSize = frameHeight * 0.36;

/**
 * Avatar documentation
 */
const Fighter: React.FunctionComponent<AvatarProps> = ({ player, isAlly }) => {
  return (
    <View style={styles.container}>
      {isAlly && !player && (
        <Fragment>
          <TouchableOpacity>
            <ThemedSVG
              SVGImage={CallAlly}
              height={avatarSize}
              width={avatarSize}
							theme={battleTheme}
            />
          </TouchableOpacity>
          <Text style={styles.infoText}>Help!</Text>
        </Fragment>
      )}
      {player && (
        <Fragment>
          <AvatarImage
            width={iconsSize}
            height={iconsSize}
            index={player!.memberInfo.avatar}
            theme={player!.memberInfo.theme}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              lvl {player!.level} - {GenderLabels[player!.inGameGender]}
            </Text>
          </View>
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    marginTop: 2,
  },
  infoText: {
    ...globalStyles.text,
  },
});

export default Fighter;
