import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../../../game/screens/Main';
import PlayersScreen from '../../../players/screens/Main';
import Header from '../../containers/Header';

const fade = ({
    current,
    next
}: any) => {
  return {
		cardStyle: {
			opacity: current.progress,
		},
	}
};

const AppStack = createStackNavigator();
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
