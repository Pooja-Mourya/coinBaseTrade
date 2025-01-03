import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from './AppColors';

const CommonModal = ({visible, onClose, modalTitle, modalContent}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            accessible
            accessibilityLabel="Close Modal"
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>❌</Text>
          </TouchableOpacity>
          {/* Modal Title */}
          {modalTitle && <Text style={styles.title}>{modalTitle}</Text>}
          {/* Modal Content */}
          <View>{modalContent}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.container1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.container2,
    borderRadius: 50,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
});
