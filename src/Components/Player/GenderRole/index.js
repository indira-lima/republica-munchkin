import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

import { circulo } from '../../../Utils/styles' 
import genderIcons from '../utils/genders'

const PlayerGender = ({ player, theme }) => {
  return (
    <View style={[
      styles.container,
      { borderColor: theme.colors.primary }
    ]}>
      <FastImage
        source={genderIcons[player.gender]}
        style={styles.image}
      />
    </View>
  )
}

const containerSize = 78

const styles = StyleSheet.create({
  container: {
    ...circulo(containerSize),
    borderWidth: 3,
  },
  image: {
    height: containerSize * 0.6,
    width: containerSize * 0.6,
  }
})

export default PlayerGender

