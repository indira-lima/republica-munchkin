import React from 'react'
import { TextInput as RNTextInput, View } from 'react-native'
import { useField } from 'formik'

import ErrorMessage from './ErrorMessage'
import Label from './Label'

import styles from './styles'

const FormikTextInput = ({ placeholder, label, ...props }) => {
	const [field, meta, helpers] = useField(props)

	return (
		<View style={styles.container}>
			{label && <Label text={label}/>}
			<RNTextInput
				placeholder={placeholder}
				style={[styles.input, meta.touched && meta.error ? styles.error : {}]}
				{...props}
				value={String(field.value)}
				onChangeText={(v) => helpers.setValue(v)}
				onBlur={(e) => helpers.setTouched(true)}
			/>
			{meta.touched && meta.error && <ErrorMessage message={meta.error} />}
		</View>
	);
}

export default FormikTextInput