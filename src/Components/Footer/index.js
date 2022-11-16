import React, { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import IonIcons from '@expo/vector-icons/Ionicons'

import { circulo, colors } from '../../Utils/styles'
import { resetNavigationToMenu } from '../../Utils/functions'

const Footer = ({ setFooterHeight = () => {} }) => {
	// navigation
	const navigation = useNavigation()
	const route = useRoute()
	
	const itensRodape = useMemo(() => [
		{ 
			ordem: 1,
			nome: 'Voltar',
			icone: 'chevron-back',
			disabled: !navigation.canGoBack(),
			onPress: () => {
				navigation.canGoBack() && navigation.goBack()
			}
		},
		{
			ordem: 2,
			nome: 'Menu Inicial',
			icone: 'home',
			disabled: route.name === 'Menu',
			onPress: () => {
				resetNavigationToMenu(navigation)
			}
		},
	], [navigation])

	/**
	 * Compartilha o tamanho do footer para calcular o tamanho do conteúdo
	 * no MainContainer e habilitar o scroll caso necessário
	 */
	const handleOnLayout = useCallback((e) => {
		setFooterHeight(e.nativeEvent.layout.height);
	}, [setFooterHeight])

  	return (
		<View style={styles.tabBar} onLayout={handleOnLayout}>
			{itensRodape
				.sortBy('ordem')
				.map(({ nome, icone, onPress, disabled = false }) => (
					<TouchableOpacity
						key={nome}
						accessibilityRole="button"
						accessibilityLabel={nome}
						style={[styles.tabBarButton, disabled ? styles.btnDisabled : {}]}
						onPress={onPress}
						disabled={disabled}
					>
						<IonIcons name={icone} size={iconeSize} color={colors.text} />
					</TouchableOpacity>
				))
			}
	  </View>
	)
};

const iconeSize = 28
const containerIconeSize = iconeSize * 1.5
const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 8,
		backgroundColor: colors.primary,
	},
	tabBarButton: {
		alignItems: 'center',
		backgroundColor: 'white',
		...circulo(containerIconeSize),
	},
	btnDisabled: {
		backgroundColor: '#E1DBDB',
	},
	tabBarButtonLabel: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 10,
	}
});

export default Footer
