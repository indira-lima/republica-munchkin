import { StyleSheet } from 'react-native'

import globalStyles, { vw }  from '../../Utils/styles'

export const frameWidth = vw(90)
export const frameHeight = frameWidth * 0.39

export const themes = {
  default: {
    frame: require('../../../assets/frames/default.png'),
    colors: {
      primary: '#5AADCB',
      secondary: '#316E9F',
    },
  },
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: frameWidth,
    height: frameHeight,
    position: 'relative',
    justifyContent: 'center',
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
  nameAndLevel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    ...globalStyles.text,
    fontSize: 20,
    color: '#fff',
  }
})

export default styles
