import React, { useCallback, useEffect, useState } from "react";
import { Image as RNImage, ImageSourcePropType } from "react-native";
import { Image as ExpoImage, ImageStyle } from "expo-image";

interface ScaledImageProps {
  source: string | ImageSourcePropType;
  width?: number;
  height?: number;
  style?: ImageStyle;
}

const ScaledImage: React.FunctionComponent<ScaledImageProps> = ({
  source,
  width,
  height,
  style,
}) => {
  const [calculedWidth, setCalculedWidth] = useState(0);
  const [calculedHeight, setCalculedHeight] = useState(0);
  const [uri, setUri] = useState("");

  useEffect(() => {
    if (typeof source === "string") {
      setUri(source);
      RNImage.getSize(source, calculateImageSize);
    } else {
      const { uri, width, height } = RNImage.resolveAssetSource(source);
      setUri(uri);
      calculateImageSize(width, height);
    }
  }, []);

  const calculateImageSize = useCallback(
    (imgWidth: number, imgHeight: number) => {
      if (width && !height) {
        setCalculedWidth(width);
        setCalculedHeight(imgHeight * (width / imgWidth));
      } else if (!width && height) {
        setCalculedWidth(imgWidth * (height / imgHeight));
        setCalculedHeight(height);
      } else if (width && height) {
        setCalculedHeight(height);
        setCalculedWidth(width);
      }
    },
    [width, height]
  );

  return uri ? (
    <ExpoImage
      source={{ uri }}
      style={[{ height: calculedHeight, width: calculedWidth }, style!]}
    />
  ) : null;
};

export default ScaledImage;
