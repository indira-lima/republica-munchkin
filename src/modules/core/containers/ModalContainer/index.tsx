import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import DefaultStatusBar from "../../components/DefaultStatusBar";

import styles, { modalSize } from "./styles";
// @ts-expect-error TS(2307): Cannot find module '../../../../../assets/modal-sq... Remove this comment to see the full error message
import ModalSquaredBg from "../../../../../assets/modal-squared.svg";

const ModalContainer = ({
  openModal = false,
  onClose = () => {},
  modalViewProps = {},
  modalViewStyle = {},
  loading = false,
  theme = {},
  children
}: any) => {
  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      // @ts-expect-error TS(2322): Type '{ translucent: true; }' is not assignable to... Remove this comment to see the full error message
      <DefaultStatusBar translucent />
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={1}
        style={styles.backdrop}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalView, modalViewStyle]}
          {...modalViewProps}
        >
          <ModalSquaredBg
            width={modalSize}
            height={modalSize}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.95 }]}
            primaryColor={theme?.colors?.primary}
            secondaryColor={theme?.colors?.secondary}
          />
          {loading ? (
            <ActivityIndicator style={{ flex: 1 }} size="large" color="#f00" />
          ) : (
            <View style={styles.contentWrapper}>{children}</View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalContainer;
