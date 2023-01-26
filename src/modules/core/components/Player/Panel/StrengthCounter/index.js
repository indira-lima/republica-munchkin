import { useCallback } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import useGame from '../../../Hooks/useGame' 
import globalStyles from '../../../Utils/styles' 

const PlayerLevelCounter = ({ player, theme }) => {

	const { editPlayer } = useGame()
	
	const handleDecreaseItems = useCallback(() => {
		 	editPlayer(player.id, {
				...player,
				items: isNaN(player.items) ? 0 : player.items - 1
			})
	}, [player])

	const handleIncreaseItems = useCallback(() => {
		 	editPlayer(player.id, {
				...player,
				items: isNaN(player.items) ? 0 : player.items + 1
			})
	}, [player])

  return (
    <View style={styles.container}>
			<TouchableOpacity
				onPress={handleDecreaseItems}
				activeOpacity={0.8}
			> 
				 <Text style={styles.text}>-</Text>
			</TouchableOpacity>
			<Text style={styles.text}>
				{player.level + player.items}
			</Text>
			<TouchableOpacity
				onPress={handleIncreaseItems}
				activeOpacity={0.8}
			> 
				 <Text style={styles.text}>+</Text>
			</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContents: 'center',
	},
	text: {
		...globalStyles.text,
		fontSize: 34,
		color: '#fff',
		marginHorizontal: 3,
	}
})

export default PlayerLevelCounter
