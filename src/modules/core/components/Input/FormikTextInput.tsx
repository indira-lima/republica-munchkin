import React from 'react'
import { TextInput as RNTextInput, View } from 'react-native'
import { useField } from 'formik'

import ErrorMessage from './ErrorMessage'
import Label from './Label'

import styles from './styles'

const FormikTextInput = ({
    placeholder,
    label,
    ...props
}: any) => {
	const [field, meta, helpers] = useField(props)

	return (
		<View style={styles.container}>
// @ts-expect-error TS(2322): Type '{ text: any; }' is not assignable to type 'I... Remove this comment to see the full error message
			{label && <Label text={label}/>}
			<RNTextInput
				placeholder={placeholder}
				style={[styles.input, meta.touched && meta.error ? styles.error : {}]}
				{...props}
				value={String(field.value)}
				onChangeText={(v) => helpers.setValue(v)}
				onBlur={(e) => helpers.setTouched(true)}
			/>
// @ts-expect-error TS(2322): Type '{ message: string; }' is not assignable to t... Remove this comment to see the full error message
			{meta.touched && meta.error && <ErrorMessage message={meta.error} />}
		</View>
	);
}

export default FormikTextInput