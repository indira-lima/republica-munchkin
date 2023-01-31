import { useCallback, useMemo } from "react";

import Button from "../../../../core/components/Button";
import themes from "../../../../core/utils/themes";

const ChangeThemeBtn = ({
  player,
  onChange = () => {}
}: any) => {
  const [theme, currentThemeIndex] = useMemo(() => {
    const _theme = themes[player?.theme] || themes[0];
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const index = themes.findIndex((t) => t.name === _theme.name);

    return [_theme, index];
  }, [player?.theme]);

  const handleChangeTheme = useCallback(() => {
    let newThemeIndex;
    if (currentThemeIndex === themes.length - 1) {
      newThemeIndex = 0;
    } else {
      newThemeIndex = currentThemeIndex + 1;
    }

    onChange(newThemeIndex);
  }, [currentThemeIndex]);

  return (
    <Button
      type="hexagon"
      theme={theme?.name}
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'null | un... Remove this comment to see the full error message
      icon="select-color"
      onPress={handleChangeTheme}
    />
  );
};

export default ChangeThemeBtn;
