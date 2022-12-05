import { StyleSheet } from 'react-native'

import globalStyles, { vw }  from '../../Utils/styles'

export const frameWidth = vw(90)
export const frameHeight = frameWidth * 0.37

export const themes = {
  default: {
    frame: require('../../../assets/frames/default.png'),
    colors: {
      primary: '#5AADCB',
      secondary: '#316E9F',
    },
  },
  black: {
    frame: require('../../../assets/frames/black.png'),
    colors: {
      primary: '#0f0f0f',
      secondary: '#363636',
    },
  },
  red: {
    frame: require('../../../assets/frames/red.png'),
    colors: {
      primary: '#871932',
      secondary: '#DD2C53',
    },
  },
  pink: {
    frame: require('../../../assets/frames/pink.png'),
    colors: {
      primary: '#831759',
      secondary: '#FC27AD',
    },
  },
  magenta: {
    frame: require('../../../assets/frames/magenta.png'),
    colors: {
      primary: '#771783',
      secondary: '#BB17CF',
    },
  },
  purple: {
    frame: require('../../../assets/frames/purple.png'),
    colors: {
      primary: '#511783',
      secondary: '#7C17CF',
    },
  },
  blue: {
    frame: require('../../../assets/frames/blue.png'),
    colors: {
      primary: '#241783',
      secondary: '#5128FC',
    },
  },
  green: {
    frame: require('../../../assets/frames/green.png'),
    colors: {
      primary: '#17832E',
      secondary: '#27FC63',
    },
  },
  yellow: {
    frame: require('../../../assets/frames/yellow.png'),
    colors: {
      primary: '#7D8317',
      secondary: '#FBFC27',
    },
  },
  weed: {
    frame: require('../../../assets/frames/weed.png'),
    colors: {
      primary: '#771783',
      secondary: '#771783',
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
  nameAndLevel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
		marginHorizontal: 6,
  },
  name: {
    ...globalStyles.text,
    fontSize: 20,
    color: '#fff',
  },
	swipeActionContainer: {
		height: frameHeight,
		backgroundColor: 'magenta',
		borderWidth: 1,
		borderColor: 'red',
	},
	swipeContainer: {
    width: 80,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
		flexDirection: "row",
  },
  swipeIcon: {
    width: 64,
    height: 64,
  },
})

export default styles
