import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Player } from "../../../core/definitions";
import AvatarImage from "../../../core/components/AvatarImage";
import ChooseAlly from "../ChooseAlly";

import globalStyles from "../../../core/utils/styles";
import { GenderLabels } from "../../../core/utils/static";

import { iconsSize } from "../PlayerBattlePanel/styles";
import { battleTheme } from "../../../core/utils/themes";

interface AvatarProps {
  player?: Player;
  isAlly?: boolean;
}

/**
 * Fighter container
 *
 * Renders the player info that is important for the battle
 * If the fighter is the main fighter's ally and it's not yet set,
 * renders the ChooseAlly component for selecting the ally
 */
const Fighter: React.FunctionComponent<AvatarProps> = ({ player, isAlly }) => {
  return (
    <View style={styles.container}>
      {isAlly && !player && <ChooseAlly />}
      {player && (
        <Fragment>
          <AvatarImage
            width={iconsSize}
            height={iconsSize}
            index={player!.memberInfo.avatar}
            theme={battleTheme}
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
