import React, { useMemo, useRef, useState } from 'react'
import { TextInput as RNTextInput, View, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useField } from 'formik'

import ErrorMessage from './ErrorMessage'
import Label from './Label'

import { colors } from '../../utils/styles'
import { momentTz } from '../../utils/moment'

import styles from './styles'

const DATA_MINIMA = new Date('2010-01-01')

const DateInput = ({ label, ...props }) => {

	const today = useRef(momentTz().toDate()).current

	const [open, setOpen] = useState(false)
	
	const [field, meta, helpers] = useField({
		...props,
		validate: (value = "") => {
			let error
			const parsedDate = momentTz(value, 'DD/MM/YYYY')
			if (value.startsWith('\/')	||
				value.endsWith('\/')	||
				value.length < 10	||
				!parsedDate.isValid()
			) {
				error = 'Informe uma data válida'
			} else if (parsedDate.isBefore(DATA_MINIMA)) {
				error = 'Informe uma data mais recente'
			}

			return error
		}
	})

	const datePickerValue = useMemo(() => {
		if (meta.error || !field.value) return today

		try {
			const date = momentTz(field.value, 'DD/MM/YYYY')
			if (isNaN(`${date}`) || !date.isValid) {
				return today
			}

			return date.toDate()
		} catch (e) {
			console.log('date input picker error:', e)
			return today
		}
	}, [field.value, meta.error])

	return (
		<View style={styles.container}>
			{label && <Label text={label}/>}
			<View style={[styles.iconInput, meta.touched && meta.error ? styles.error : {}]}>
				<RNTextInput
					placeholder={'Data inválida'}
					style={{ flex: 1 }}
					value={field.value}
					onChangeText={(v) => helpers.setValue(v)}
					onBlur={() => helpers.setTouched(true)}
					maxLength={10}
					{...props}
				/>
				<TouchableOpacity activeOpacity={1} onPress={() => setOpen(true)}>
					<MaterialCommunityIcons name='calendar-outline' size={28} color={colors.action}/>
				</TouchableOpacity>
			</View>
			{meta.touched && meta.error && <ErrorMessage message={meta.error} />}

			<DatePicker
				modal
				mode='date'
				open={open}
				locale='pt_BR'
				date={datePickerValue || today}
				minimumDate={DATA_MINIMA}
				onConfirm={(date) => {
					setOpen(false)
					helpers.setTouched(true)
					helpers.setValue(momentTz(date).format('DD/MM/YYYY'))
				}}
				onCancel={() => {
					setOpen(false)
					helpers.setTouched(true)
				}}
			/>
		</View>
	);
}

export default DateInput