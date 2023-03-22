import React, { useCallback, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated, {FadeIn, FadeOut, FlipInEasyY, FlipOutEasyY} from "react-native-reanimated";
import useInterval from "../../hooks/useInterval";

interface DoubleTapButtonProps {
  idleChildren: JSX.Element;
  confirmChildren: JSX.Element;
  onConfirm: () => void;
  timeout?: number;
}

// default time to wait to go back to idle state after the first tap
const BACK_TO_IDLE_TIMEOUT = 2000;

/**
 * Container for setting a button that needs a second tap to activate, showing
 * a confirm button after the first tap
 */
const DoubleTapButton: React.FunctionComponent<DoubleTapButtonProps> = ({
  idleChildren,
  confirmChildren,
  onConfirm,
  timeout,
}) => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [resetCountTimeout, setResetCountTimeout] = useState<number | null>(
    null
  );

  /**
   * Set up a react interval that resets the tap count
   * after the timeout
   *
   * To activate the interval, set a timeout in ms
   */
  useInterval(() => {
    setTapCount(0);
    setResetCountTimeout(null);
  }, resetCountTimeout);

	/**
	 * Callback called when the user presses the DoubleTapButton
	 * If the tap count is 0, update to 1 and sets a timeout for reseting to 0
	 * Else, reset to 0 immediatly and call the onConfirm callback
	 */
  const handleTap = useCallback(() => {
		if (tapCount === 0) {
			setTapCount(1);
			setResetCountTimeout(timeout || BACK_TO_IDLE_TIMEOUT);
			return;
		}

		setTapCount(0);
		onConfirm();
	}, [tapCount, timeout]);

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View>
        {tapCount === 0 && (
          <Animated.View entering={FlipInEasyY} exiting={FlipOutEasyY}>
            {idleChildren}
          </Animated.View>
        )}
        {tapCount === 1 && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {confirmChildren}
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DoubleTapButton;
