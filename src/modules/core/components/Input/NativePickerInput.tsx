import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';

const NativePickerInput = ({
    placeholder,
    error,
    label,
    touched,
    items,
    ...otherProps
}: any, ref: any) => {
	
	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
// @ts-expect-error TS(2339): Property 'border' does not exist on type '{ contai... Remove this comment to see the full error message
			<View style={[styles.border, error ? styles.error : {}]}>
				<Picker
					ref={ref}
					placeholder={placeholder}
					style={styles.inputBorderless}
					{...otherProps}
				>
// @ts-expect-error TS(7031): Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
					{items.map(({label, value}) => (
						<Picker.Item label={label} value={value} key={value} style={styles.itemPicker} />
					))}
				</Picker>
			</View>
			{error && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	);
}

export default React.forwardRef(NativePickerInput)