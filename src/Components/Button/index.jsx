import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fragment, useCallback } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import styles, { dimensions, themes } from "./styles";

const Button = ({
  text = "",
  icon = null,
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

  const _theme = themes[theme] || themes.default;
  const _themeImg = _theme.img[type] || _theme.img.large;
  const _typeDimensions = dimensions[type] || dimensions.large;

  const _btnStyle = [styles.btn, _typeDimensions.container, btnStyle];
  _disabled && _btnStyle.push(btnStyleDisabled);

  const renderIcon = useCallback(() => {
    if (typeof icon === "string") {
      return (
        <MaterialCommunityIcons
          name={icon}
          color={_theme.text}
          size={_typeDimensions.icon}
        />
      );
    } else {
      return (
        <FastImage
          source={icon}
          style={{ width: _typeDimensions.icon, height: _typeDimensions.icon }}
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
      <FastImage
        source={_themeImg}
        style={[styles.imgBg, _typeDimensions.container]}
      />
      {loading ? (
        <ActivityIndicator size="small" color={_theme.text} />
      ) : (
        <Fragment>
          {!!icon && renderIcon()}
          {!!text && (
            <Text style={[styles.textBtn, _theme.text, textStyle]}>{text}</Text>
          )}
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

export default Button;
