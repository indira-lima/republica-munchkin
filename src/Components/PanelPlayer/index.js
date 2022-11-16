import { View, Text } from 'react-native'
import FastImage  from 'react-native-fast-image'

import { vw }  from '../../Utils/styles'
import styles, { themes }  from './styles'

import Avatar  from '../PlayerAvatar'
import Gender  from '../PlayerGender'
import LevelCounter  from '../PlayerLevelCounter'

const PanelPlayer = ({
  player
}) => {
  const theme = themes[player.theme] || themes.default

  return (
    <View style={styles.container}>
      <FastImage source={theme.frame} style={styles.frame}/>
        <View style={styles.content}>
          <Avatar player={player} theme={theme} />
          <View style={styles.nameAndLevel}>
            <Text style={styles.name}>{player.name}</Text>
            <LevelCounter player={player} theme={theme} />
          </View>
          <Gender player={player} theme={theme} />
        </View>
    </View>
  )
}

export default PanelPlayer

