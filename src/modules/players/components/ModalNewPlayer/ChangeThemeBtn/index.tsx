import { useCallback, useMemo } from "react";

import Button from "../../../../core/components/Button";
import themes from "../../../../core/utils/themes";
import { Player, Theme } from "../../../../core/definitions";

interface ChangeThemeBtnProps {
  player: Player;
  onChange: (newTheme: Theme) => void;
}

const ChangeThemeBtn: React.FunctionComponent<ChangeThemeBtnProps> = ({
  player,
  onChange = () => {},
}) => {
  const [theme, currentThemeIndex] = useMemo(() => {
    const _theme = player?.theme || themes[0];
    const index = themes.findIndex((t) => t.name === _theme?.name);

    return [_theme, index];
  }, [player?.theme]);

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
