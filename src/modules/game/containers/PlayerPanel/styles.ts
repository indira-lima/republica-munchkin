import { StyleSheet } from 'react-native'

import { vw } from '../../../core/utils/styles'

export const frameWidth = vw(90)
export const frameHeight = frameWidth * 0.38

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: frameWidth,
    height: frameHeight,
    position: 'relative',
    justifyContent: 'center',
		marginTop: 15,
  },
  content: {
    height: frameHeight - 36,
    flexDirection: 'row',
    alignItems: 'flex-start',
		justifyContent: 'space-between',
  },
  swipeIcon: {
    width: 64,
    height: 64,
  },
})

export default styles
