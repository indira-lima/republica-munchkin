import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
// @ts-expect-error TS(2307): Cannot find module 'react-native-dropdown-picker' ... Remove this comment to see the full error message
import DropDownPicker from 'react-native-dropdown-picker';

import Button from "../Button";

import globalStyles from "../../utils/styles";
import styles from "./styles";

const PickerInput = ({
// @ts-expect-error TS(7031): Binding element 'items' implicitly has an 'any' ty... Remove this comment to see the full error message
	items,
// @ts-expect-error TS(7031): Binding element 'initialValue' implicitly has an '... Remove this comment to see the full error message
	initialValue,
// @ts-expect-error TS(7031): Binding element 'emptyText' implicitly has an 'any... Remove this comment to see the full error message
	emptyText,
// @ts-expect-error TS(7031): Binding element 'reloadList' implicitly has an 'an... Remove this comment to see the full error message
	reloadList,
// @ts-expect-error TS(7031): Binding element 'onSelect' implicitly has an 'any'... Remove this comment to see the full error message
	onSelect,
// @ts-expect-error TS(7031): Binding element 'error' implicitly has an 'any' ty... Remove this comment to see the full error message
	error,
	...otherProps
// @ts-expect-error TS(7006): Parameter 'ref' implicitly has an 'any' type.
}, ref) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState(null)

	useEffect(() => {
		onSelect(value)
	}, [value])

	return (
		<View style={styles.container}>
			<DropDownPicker
				ref={ref}
				items={items}
				open={isOpen}
				setOpen={setIsOpen}
				value={value || initialValue}
				setValue={setValue}
				activityIndicatorColor="red"
				searchPlaceholder="Pesquisar..."
				style={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0 }}
				containerStyle={[styles.input, error ? styles.error : { }]}
				textStyle={globalStyles.text}
				searchTextInputStyle={styles.input}
				ListEmptyComponent={({
// @ts-expect-error TS(7031): Binding element 'listMessageContainerStyle' implic... Remove this comment to see the full error message
					listMessageContainerStyle, listMessageTextStyle, ActivityIndicatorComponent, loading
				  }) => (
					<View style={listMessageContainerStyle}>
					  {loading ? (
						<ActivityIndicatorComponent />
					  ) : (
						<>
						<Text style={listMessageTextStyle}>
						  {emptyText}
						</Text>
// @ts-expect-error TS(2322): Type '{ margin: string[]; text: string; onPress: a... Remove this comment to see the full error message
						{reloadList && <Button margin={['top']} text="Recarregar" onPress={reloadList} />}
						</>
					  )}
					</View>
				  )}
				{...otherProps}
			/>
			{error && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	);
}

export default React.forwardRef(PickerInput)