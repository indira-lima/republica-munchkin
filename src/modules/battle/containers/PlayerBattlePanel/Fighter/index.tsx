import React, { Fragment, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import AvatarImage from "../../../../core/components/AvatarImage";
import { Player } from "../../../../core/definitions";
import ChooseAlly from "../ChooseAlly";

import { GenderLabels } from "../../../../core/utils/static";
import globalStyles, {fonts} from "../../../../core/utils/styles";

import ThemedSVG from "../../../../core/components/ThemedSVG";
import { battleTheme } from "../../../../core/utils/themes";
import { useBattle } from "../../../contexts/BattleContext";
import { fightersSize } from "../styles";

// @ts-ignore
import CallAlly from "../../../../../../assets/icons/CallAlly.svg";
import DoubleTapButton from "../../../../core/containers/DoubleTapButton";

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

  const { setAllyPlayer } = useBattle();

	const renderFigterAvatar = useCallback(() => {
		return (
			<Fragment>
				<AvatarImage
					width={fightersSize}
					height={fightersSize}
					index={player?.memberInfo.avatar!}
					theme={battleTheme}
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.infoText}>
						lvl {player!.level} - {GenderLabels[player!.inGameGender]}
					</Text>
				</View>
			</Fragment>
		)
	}, [player])

	const renderFighterContainer = useCallback(() => {
		if (!isAlly) {
			return renderFigterAvatar();
		}

		return (
			<DoubleTapButton
				idleChildren={renderFigterAvatar()}
				confirmChildren={(
					<Fragment>
						<ThemedSVG
							theme={battleTheme}
							SVGImage={CallAlly}
							width={fightersSize}
							height={fightersSize}
						/>
						<Text style={styles.infoText}>Remove Ally</Text>
					</Fragment>
				)}
				onConfirm={() => setAllyPlayer(undefined)}
			/>
		)
	}, [isAlly, renderFigterAvatar])

  return (
    <View style={styles.container}>
      {isAlly && !player && <ChooseAlly />}
      {player && (
        renderFighterContainer()
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
		fontSize: fonts.small,
  },
});

export default Fighter;
