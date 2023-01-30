import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import DefaultStatusBar from "../../components/DefaultStatusBar";

import styles, { modalSize } from "./styles";
import ModalSquaredBg from "../../../../../assets/modal-squared.svg";

const ModalContainer = ({
  openModal = false,
  onClose = () => {},
  modalViewProps = {},
  modalViewStyle = {},
  loading = false,
  theme = {},
  children,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
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
