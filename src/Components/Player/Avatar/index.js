import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {circulo} from '../../../Utils/styles'

import avatarImages from './avatars'

const PlayerAvatar = ({ player, theme }) => {
	const avatarSource = useMemo(() => {
		const avatar = avatarImages[player?.avatar]
		return avatar || avatarImages[0]
	}, [player])

  return (
    <View>
      <FastImage
        source={avatarSource}
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
