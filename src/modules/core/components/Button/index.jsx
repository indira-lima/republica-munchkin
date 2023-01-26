import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fragment, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import styles, { buttonThemes, dimensions, sources } from "./styles";

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

  const themeObject = useMemo(
    () => buttonThemes.find((t) => t.name === theme) || buttonThemes[0],
    [theme]
  );
  const typeDimensions = dimensions[type] || dimensions.large;
  const SvgSource = sources[type] || sources.large;

  const _btnStyle = [styles.btn, typeDimensions.container, btnStyle];
  _disabled && _btnStyle.push(btnStyleDisabled);

  const renderIcon = useCallback(() => {
    if (typeof icon === "string") {
      return (
        <MaterialCommunityIcons
          name={icon}
          color={themeObject.colors.text}
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
        <ActivityIndicator size="small" color={themeObject.colors.text} />
      ) : (
        <Fragment>
          {!!icon && renderIcon()}
          {!!text && (
            <Text style={[styles.textBtn, themeObject.colors.text, textStyle]}>
              {text}
            </Text>
          )}
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

export default Button;
