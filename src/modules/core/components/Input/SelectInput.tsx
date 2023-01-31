import { useField, useFormikContext } from "formik"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import ErrorMessage from "./ErrorMessage"
import Label from "./Label"

import globalStyles, { colors, fonts } from "../../utils/styles"

const SelectInput = ({
    label,
    items,
    readOnly = false,
    name,
    ...props
}: any) => {
	const {
// @ts-expect-error TS(2538): Type 'any' cannot be used as an index type.
		values: { [name]: selectedValue },
	} = useFormikContext()

	const [_field, meta, helpers] = useField({ name, ...props })

	return (
		<View style={styles.container}>
// @ts-expect-error TS(2322): Type '{ text: any; }' is not assignable to type 'I... Remove this comment to see the full error message
			<Label text={label} />
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollView}
			>
// @ts-expect-error TS(7006): Parameter 'item' implicitly has an 'any' type.
				{items.map((item) => {
					const { label, value } = item
					const selected = value === selectedValue?.value

					return (
						<TouchableOpacity key={value}
							activeOpacity={selected || readOnly ? 1 : 0.6}
							style={[styles.btn, selected ? styles.btnSelected : null]}
							onPress={!readOnly
								? () => helpers.setValue(item)
								: undefined
							}
							disabled={selected}
						>
							<Text style={[styles.btnText, selected ? styles.btnSelectedText : null]}>
								{label}
							</Text>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
// @ts-expect-error TS(2322): Type '{ message: string; }' is not assignable to t... Remove this comment to see the full error message
			{meta.error && <ErrorMessage message={meta.error} />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
		alignItems: 'flex-start',
		position: 'relative',
	},
	scrollView: {
		width: '100%',
		marginTop: 2,
	},
	btn: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		marginRight: 10,
		borderColor: colors.text,
		borderWidth: 1,
		borderRadius: 15,
	},
	btnSelected: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	btnText: {
		...globalStyles.text,
		fontSize: fonts.large,
	},
	btnSelectedText: {
		color: '#FFFFFF'
	}
});

export default SelectInput