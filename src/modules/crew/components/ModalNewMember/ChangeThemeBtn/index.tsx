import { useCallback, useMemo } from "react";

import Button from "../../../../core/components/Button";
import { CrewMember, Theme } from "../../../../core/definitions";
import themes from "../../../../core/utils/themes";

interface ChangeThemeBtnProps {
  crewMember: CrewMember;
  onChange: (newTheme: Theme) => void;
}

const ChangeThemeBtn: React.FunctionComponent<ChangeThemeBtnProps> = ({
  crewMember,
  onChange = () => {},
}) => {
  const [theme, currentThemeIndex] = useMemo(() => {
    const _theme = crewMember?.theme || themes[0];
    const index = themes.findIndex((t) => t.name === _theme?.name);

    return [_theme, index];
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
    <Button
      type="hexagon"
      theme={theme?.name}
      icon="select-color"
      onPress={handleChangeTheme}
    />
  );
};

export default ChangeThemeBtn;
