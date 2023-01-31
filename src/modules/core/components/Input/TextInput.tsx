import React from "react";
import { TextInput as RNTextInput, View, Text } from "react-native";

import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import styles from "./styles";

const TextInput = (
  {
    placeholder,
    error,
    label,
    touched,
    ...otherProps
  }: any,
  ref: any
) => {
  return (
    <View style={styles.container}>
      // @ts-expect-error TS(2322): Type '{ text: any; }' is not assignable to type 'I... Remove this comment to see the full error message
      {label && <Label text={label} />}
      <RNTextInput
        placeholder={placeholder}
        placeholderTextColor={"#ebebeb"}
        style={[styles.input, touched && error ? styles.error : {}]}
        ref={ref}
        {...otherProps}
      />
      // @ts-expect-error TS(2322): Type '{ message: any; }' is not assignable to type... Remove this comment to see the full error message
      {touched && error && <ErrorMessage message={error} />}
    </View>
  );
};

export default React.forwardRef(TextInput);

