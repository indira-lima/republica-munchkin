import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Fragment, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import FastImage, { Source } from "react-native-fast-image";
import styles, { buttonThemes, dimensions, sources } from "./styles";

interface ButtonProps {
  text?: string;
  icon?: string | number | Source;
  type?: "large" | "squared" | "hexagon";
  theme?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: {};
  styleDisabled?: {};
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text = "",
  icon = undefined,
  type = "large",
  theme = "default",
  onPress = () => {},
  loading = false,
  disabled = false,
  style: btnStyle = {},
  styleDisabled: btnStyleDisabled = {},
  textStyle = {},
}) => {
  const _disabled = disabled || loading;

  const typeDimensions = dimensions[type];
  const SvgSource = sources[type];

  const themeObject = useMemo(() => {
    const _theme = buttonThemes.find((t) => t.name === theme);
    return _theme || buttonThemes[0];
  }, [theme]);

  const _btnStyle = [styles.btn, typeDimensions.container, btnStyle];
  _disabled && _btnStyle.push(btnStyleDisabled);

  const renderIcon = useCallback(() => {
    if (typeof icon === "string") {
      return (
        <MaterialCommunityIcons
          // @ts-ignore
          name={icon}
          color={themeObject?.colors.text}
          size={typeDimensions.icon}
        />
      );
    } else {
      return (
        <FastImage
          source={icon}
          style={{ width: typeDimensions.icon, height: typeDimensions.icon }}
        />
      );
    }
  }, [icon]);

  return (
    <TouchableOpacity
      style={_btnStyle}
      onPress={onPress}
      disabled={_disabled}
      activeOpacity={0.75}
    >
      <SvgSource
        style={StyleSheet.absoluteFill}
        width={typeDimensions.container.width}
        height={typeDimensions.container.height}
        primaryColor={themeObject?.colors?.primary}
        secondaryColor={themeObject?.colors?.secondary}
      />
      {loading ? (
        <ActivityIndicator size="small" color={themeObject?.colors.text} />
      ) : (
        <Fragment>
          {!!icon && renderIcon()}
          {!!text && (
            <Text
              style={[
                styles.textBtn,
                { color: themeObject?.colors.text },
                textStyle,
              ]}
            >
              {text}
            </Text>
          )}
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

export default Button;
