import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../../Screens/Game';
import PlayersScreen from '../../Screens/Players';
import Header from '../../Components/Header';

const fade = ({ current, next }) => {
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
