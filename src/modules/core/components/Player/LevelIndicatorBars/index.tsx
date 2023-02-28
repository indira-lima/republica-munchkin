import { View, StyleSheet } from "react-native";

import { Player } from "../../../definitions";
import { vw } from "../../../utils/styles";
import ThemedSVG from "../../ThemedSVG";

// @ts-ignore
import Level1 from "../../../../../../assets/levels/Level1.svg";
// @ts-ignore
import Level2 from "../../../../../../assets/levels/Level2.svg";
// @ts-ignore
import Level3 from "../../../../../../assets/levels/Level3.svg";
// @ts-ignore
import Level4 from "../../../../../../assets/levels/Level4.svg";
// @ts-ignore
import Level5 from "../../../../../../assets/levels/Level5.svg";
// @ts-ignore
import Level6 from "../../../../../../assets/levels/Level6.svg";
// @ts-ignore
import Level7 from "../../../../../../assets/levels/Level7.svg";
// @ts-ignore
import Level8 from "../../../../../../assets/levels/Level8.svg";
// @ts-ignore
import Level9 from "../../../../../../assets/levels/Level9.svg";
// @ts-ignore
import Level10 from "../../../../../../assets/levels/Level10.svg";

const Levels = [
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level7,
  Level8,
  Level9,
  Level10,
];

const svgWidth = vw(50);
const svgHeight = svgWidth * 0.2;

const PlayerLevelBars = ({ player }: { player: Player }) => {
  return (
    <View style={styles.container}>
      <ThemedSVG
        SVGImage={Levels[player.level-1]}
        width={svgWidth}
        height={svgHeight}
        theme={player.memberInfo.theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: svgWidth,
    height: svgHeight,
		marginBottom: 2,
  },
});

export default PlayerLevelBars;
