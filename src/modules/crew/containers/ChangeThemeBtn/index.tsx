import { useCallback, useMemo } from "react";
import {TouchableOpacity} from "react-native";

import ThemedSVG from "../../../core/components/ThemedSVG";
import { CrewMember, Theme } from "../../../core/definitions";
import themes from "../../../core/utils/themes";

// @ts-ignore
import ChangeTheme from "../../../../../assets/icons/ChangeTheme.svg"

interface ChangeThemeBtnProps {
  crewMember: CrewMember;
  onChange: (newTheme: Theme) => void;
	width: number | string;
	height: number | string;
}

const ChangeThemeBtn: React.FunctionComponent<ChangeThemeBtnProps> = ({
  crewMember,
  onChange = () => {},
	width, height
}) => {
  const currentThemeIndex = useMemo(() => {
    const _theme = crewMember?.theme || themes[0];
    const index = themes.findIndex((t) => t.name === _theme?.name);

    return index;
  }, [crewMember?.theme]);

  const handleChangeTheme = useCallback(() => {
    let newThemeIndex;
    if (currentThemeIndex === themes.length - 1) {
      newThemeIndex = 0;
    } else {
      newThemeIndex = currentThemeIndex + 1;
    }

    onChange(themes[newThemeIndex]!);
  }, [currentThemeIndex]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleChangeTheme}>
      <ThemedSVG
				SVGImage={ChangeTheme}
				width={width}
				height={height}
				theme={crewMember?.theme}
			/>
    </TouchableOpacity>
  );
};

export default ChangeThemeBtn;
