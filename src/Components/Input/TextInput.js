import React from "react";
import { TextInput as RNTextInput, View, Text } from "react-native";

import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import styles from "./styles";

const TextInput = (
  { placeholder, error, label, touched, ...otherProps },
  ref
) => {
  return (
    <View style={styles.container}>
      {label && <Label text={label} />}
      <RNTextInput
        placeholder={placeholder}
        placeholderTextColor={"#ebebeb"}
        style={[styles.input, touched && error ? styles.error : {}]}
        ref={ref}
        {...otherProps}
      />
      {touched && error && <ErrorMessage message={error} />}
    </View>
  );
};

export default React.forwardRef(TextInput);

