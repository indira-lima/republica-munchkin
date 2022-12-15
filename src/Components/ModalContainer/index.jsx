import { ActivityIndicator, Modal, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import DefaultStatusBar from "../DefaultStatusBar";

import styles from "./styles";
import modalSquaredBg from '../../../assets/modal-squared.png'

const ModalContainer = ({
  openModal = false,
  onClose = () => {},
  modalViewProps = {},
  modalViewStyle = {},
  loading = false,
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
					<FastImage source={modalSquaredBg} style={styles.imgBg} />
          {loading ? (
            <ActivityIndicator style={{ flex: 1 }} size="large" color="#f00" />
          ) : (
						<View style={styles.contentWrapper}>
							{children}
						</View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalContainer;

