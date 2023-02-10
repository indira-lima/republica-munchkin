import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../../../game/screens/Main';
import PlayersScreen from '../../../players/screens/Main';
import BattleScreen from '../../../battle/screens/Main';
import Header from '../../containers/Header';
import {Player} from '../../definitions';

const fade = ({
    current,
}: any) => {
  return {
		cardStyle: {
			opacity: current.progress,
		},
	}
};

type AppStackParamList = {
	Game: undefined;
	Battle: { player: Player };
	Players: undefined;
}

const AppStack = createStackNavigator<AppStackParamList>();
export default function AppRoutes() {
	return (
		<AppStack.Navigator
			initialRouteName='Game'
			screenOptions={{
				headerShown: false,
				animationEnabled: true,
				cardStyleInterpolator: fade
			}}
		>
			<AppStack.Screen
				name="Game"
				component={GameScreen}
				options={{
					headerShown: true,
          headerTransparent: true,
					header: () => <Header />,
				}}
			/>
			<AppStack.Screen
				name="Battle"
				component={BattleScreen}
				options={{
					headerShown: true,
          headerTransparent: true,
					header: () => <Header />,
				}}
			/>
			<AppStack.Screen
				name="Players"
				component={PlayersScreen}
				options={{
					headerShown: true,
          headerTransparent: true,
					header: () => <Header />,
				}}
			/>
		</AppStack.Navigator>
	)
}
