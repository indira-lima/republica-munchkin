import "react-native-reanimated";
import "./modules/core/utils/functions";

import { useCallback, useEffect } from "react";
import { LogBox, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppAlerts from "./modules/core/containers/AppAlerts";

import { AlertProvider } from "./modules/core/contexts/AlertContext";
import { GameProvider } from "./modules/core/contexts/GameContext";

import Routes from "./modules/core/routes";
import { CrewProvider } from "./modules/core/contexts/CrewContext";

// Previne a tela de carregamento inicial de esconder automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Carrega as fontes do app de forma assíncrona
  const [fontsLoaded] = useFonts({
    KellySlab: require("../assets/fonts/KellySlab-Regular.ttf"),
  });

  // Esconde a tela de carregamento se as fontes estiverem carregadas
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    LogBox.ignoreLogs(["Can't perform"]);
  }, []);

  // Se ainda não carregou as fontes, retorna um componente vazio,
  // pois a tela de carregamento ainda está sendo mostrada
  if (!fontsLoaded) return null;

  // Ao carregar as fontes e renderizar a View, o método onLayoutRootView
  // será chamado e a tela de carregamento será escondida
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AlertProvider>
        <CrewProvider>
          <GameProvider>
            <Routes />
            <AppAlerts />
          </GameProvider>
        </CrewProvider>
      </AlertProvider>
    </View>
  );
}
