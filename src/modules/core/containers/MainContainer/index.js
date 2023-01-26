import { useMemo, Fragment } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import DefaultStatusBar from "../../components/DefaultStatusBar";
import ScaledImage from "../../components/ScaledImage";

import Footer from "./Footer";
import { HEADER_HEIGHT } from "./Header";

import backgroundSpace from "../../../../../assets/background.png";

import { colors } from "../../utils/styles";

const screenWidth = Dimensions.get("screen").width;

const MainContainer = ({
  loading = false,
  showBackgroundImage = true,
  children,
  FooterComponent = Footer,
}) => {
  const isFocused = useIsFocused();

  const Container = useMemo(() => {
    return showBackgroundImage
      ? ({ children }) => <View style={styles.imageContainer}>{children}</View>
      : ({ children }) => <Fragment>{children}</Fragment>;
  }, []);

  return (
    <Container>
      {isFocused && <DefaultStatusBar />}
      {showBackgroundImage && (
        <ScaledImage
          source={backgroundSpace}
          style={styles.image}
          resizeMethod="scale"
          resizeMode="stretch"
          width={screenWidth}
        />
      )}
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator
            color={colors.secondary}
            size="large"
            style={{ flex: 1 }}
          />
        ) : (
          <View style={styles.body}>{children}</View>
        )}
      </SafeAreaView>
      <FooterComponent />
    </Container>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
  },
  image: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  body: { flex: 1, paddingTop: HEADER_HEIGHT },
});

export default MainContainer;
