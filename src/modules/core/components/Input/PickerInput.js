import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Button from "../Button";

import globalStyles from "../../Utils/styles";
import inputStyles from "../Input/styles";
import styles from "./styles";

const PickerInput = ({
	items,
	initialValue,
	emptyText,
	reloadList,
	onSelect,
	error,
	...otherProps
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
				searchTextInputStyle={inputStyles.input}
				ListEmptyComponent={({
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