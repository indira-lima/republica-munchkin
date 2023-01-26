import React, { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import IonIcons from '@expo/vector-icons/Ionicons'

import { circulo, colors } from '../../utils/styles'

const Footer = () => {
	// navigation
	const navigation = useNavigation()
	const route = useRoute()

	/**
	 * Return an object to configure a footer item with navigation action
	 */
	const getLinkConfig = useCallback((routeName, params = {}) => {
		return {
			active: route.name === routeName,
			onPress: () => {
				navigation.navigate(routeName, params)
			}
		}
	}, [route, navigation])
	
	const footerItems = useMemo(() => [
		{ 
			order: 1,
			label: 'Game',
			icon: 'game-controller',
			...getLinkConfig('Game')
		},
		{
			order: 2,
			label: 'Players',
			icon: 'people',
			...getLinkConfig('Players')
		},
	], [navigation, getLinkConfig])


  	return (
		<View style={styles.tabBar}>
			{footerItems
				.sortBy('order')
				.map(({ label, icon, onPress, active = false }) => (
					<TouchableOpacity
						key={label}
						accessibilityRole="button"
						accessibilityLabel={label}
						style={[styles.tabBarButton]}
						onPress={onPress}
						disabled={active}
					>
						<IonIcons name={icon} size={iconSize} color={active ? colors.primary : colors.text} />
					</TouchableOpacity>
				))
			}
	  </View>
	)
};

const iconSize = 36
const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 8,
		backgroundColor: `${colors.primary}50`,
	},
	tabBarButton: {
		alignItems: 'center',
	},
	tabBarButtonLabel: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 10,
	}
});

export default Footer
