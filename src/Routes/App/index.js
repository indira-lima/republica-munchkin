import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../Screens/Home';
import Header from '../../Components/Header';

const AppStack = createNativeStackNavigator();
export default function AppRoutes() {
	return (
		<AppStack.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerShown: false
			}}
		>
			<AppStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: true,
          headerTransparent: true,
					header: () => <Header />,
				}}
			/>
		</AppStack.Navigator>
	)
}
