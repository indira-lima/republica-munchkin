import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

import { circulo } from '../../Utils/styles' 

const PlayerAvatar = ({ player, theme }) => {
  return (
    <View>
      <FastImage
        source={player.avatar}
        style={[
          styles.avatarImage,
          { borderColor: theme.colors.primary },
        ]}
      />
    </View>
  )
}

const avatarSize = 78

const styles = StyleSheet.create({
  avatarImage: {
    ...circulo(avatarSize),
    borderWidth: 3,
  }
})

export default PlayerAvatar
