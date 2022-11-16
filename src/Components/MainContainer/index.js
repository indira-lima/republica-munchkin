import { useCallback, useState, useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View, Dimensions } from "react-native"
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import DefaultStatusBar from "../DefaultStatusBar";
import Footer from "../Footer";
import ScaledImage from '../ScaledImage';
import { HEADER_HEIGHT } from '../Header'

import backgroundSpace from '../../../assets/background.png';

import { colors } from "../../Utils/styles";

const screenWidth = Dimensions.get('screen').width

const MainContainer = ({
  style,
  loading = false,
  showBackgroundImage = true,
  children,
  FooterComponent = Footer
}) => {
  const isFocused = useIsFocused()

  const [contentHeight, setContentHeight] = useState(0)
	const [containerHeight, setContainerHeight] = useState(0)
	const [footerHeight, setFooterHeight] = useState(0)
	
	const handleOnContentSizeChange = useCallback((_contentWidth, _contentHeight) => {
		setContentHeight(_contentHeight)
	}, [])

	const handleOnLayout = useCallback((e) => {
		setContainerHeight(e.nativeEvent.layout.height)
	}, [])

  const Container = useMemo(() => {
    return showBackgroundImage
      ? ({children}) => <View style={styles.imageContainer}>{children}</View>
      : ({children}) => <>{children}</>
  }, [])

	return (
		<Container>
      {isFocused && <DefaultStatusBar/>}
      {showBackgroundImage && (
        <ScaledImage
          source={backgroundSpace}
          style={styles.image}
          resizeMethod='scale'
          resizeMode='stretch'
          width={screenWidth}
        />
      )}
      <SafeAreaView style={{flex:1}} onLayout={handleOnLayout}>
				{loading
				 	? <ActivityIndicator
				   		color={colors.secondary}
				  		size="large"
				  		style={{ flex: 1 }}
				  	/>
				 	: (
		        <ScrollView
		  	      style={{ flex: 1 }}
		  	      contentContainerStyle={{ flexGrow: 1 }}
		  	      showsVerticalScrollIndicator={false}
		  	      scrollEnabled={(contentHeight + footerHeight) > containerHeight}
		  	      onContentSizeChange={handleOnContentSizeChange}
		  	      nestedScrollEnabled
		  	      keyboardShouldPersistTaps='handled'
		        >
               <View style={styles.body}>
                 {children}
               </View>
		        </ScrollView>
          )
				}
    </SafeAreaView>
    {/*<FooterComponent setFooterHeight={setFooterHeight} />*/}
		</Container>
	)
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  body: { flex: 1, paddingTop: HEADER_HEIGHT, }
});

export default MainContainer
