import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';

const NativePickerInput = ({ placeholder, error, label, touched, items, ...otherProps }, ref) => {
	
	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[styles.border, error ? styles.error : {}]}>
				<Picker
					ref={ref}
					placeholder={placeholder}
					style={styles.inputBorderless}
					{...otherProps}
				>
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