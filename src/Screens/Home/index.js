import { useCallback} from "react";
import { StyleSheet, View } from "react-native"

import MainContainer from "../../Components/MainContainer";
import PanelPlayer from "../../Components/PanelPlayer";

import useGame from '../../Hooks/useGame'

import globalStyles, { circulo, fonts } from "../../Utils/styles"

//const { easVersion } = require('../../../config.json')

const HomeScreen = () => {
  const { playerList } = useGame() 

  const renderItemPlayer = useCallback(( item ) => {
      return <PanelPlayer key={item.id} player={item} />
  }, [])

	return (
		<MainContainer>
			<View style={styles.container}>
        {playerList.map(renderItemPlayer)}
      </View>
		</MainContainer>
	)
}

const iconeSize = 38
const containerIconeSize = iconeSize * 1.5

const styles = StyleSheet.create({
	container: {
		...globalStyles.containerBody,
    backgroundColor: 'transparent',
		justifyContent: 'flex-start',
	},
	opcaoMenu: {
		borderRadius: 10,
		backgroundColor: 'white',
		marginBottom: 50,
		elevation: 10,
		paddingHorizontal: 15,
		paddingVertical: 15,

		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	textContainer: {
		flex: 1,
		marginLeft: 15,
	},
	txtOpcaoMenu: {
		...globalStyles.text,
		fontSize: fonts.title,
		textAlign: 'left',
	},
	containerIcone: {
		...circulo(containerIconeSize),
		justifyContent: 'center',
		alignItems: 'center'
	},
	versaoApp: {
		textAlign: 'center',
	}
});

export default HomeScreen
