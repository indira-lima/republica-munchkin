import { StyleSheet } from 'react-native'

import { vw } from '../../../core/utils/styles'

export const frameWidth = vw(90)
export const frameHeight = frameWidth * 0.37

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: frameWidth,
    height: frameHeight,
    position: 'relative',
    justifyContent: 'center',
		marginTop: 15,
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: frameWidth,
    height: frameHeight,
  },
  content: {
    height: frameHeight - 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeIcon: {
    width: 64,
    height: 64,
  },
})

export default styles
