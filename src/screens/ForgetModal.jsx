import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../common/AppColors';
import CommonInput from '../common/CommonInput';
import apiService from '../redux/apiService';
import {useSelector} from 'react-redux';

const ForgetModal = ({visible, onClose}) => {
  const token = useSelector(state => state.auth.userData);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      ToastAndroid.show('Please enter your email.', ToastAndroid.SHORT);
      return;
    }

    const data = {
      email: email,
    };
    setLoading(true);
    try {
      const response = await apiService({
        endpoint: '/auth/forget',
        method:"POST",
        data,
        headers: {
          Authorization: token,
        },
      });

      // console.log('response for : ', response);
      if (response) {
        ToastAndroid.show('email send successfully', ToastAndroid.SHORT);
        onClose(); // Close modal after successful response
      } else {
        ToastAndroid.show(
          'Something went wrong. Try again.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show(
        'Error sending password reset. Try again.',
        ToastAndroid.SHORT,
      );
      console.error('Forgot Password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                textAlign: 'right',
                marginLeft: '85%',
                padding: 10,
                backgroundColor: '#eeee',
                borderRadius: 50,
              }}>
              ❌
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>

          <CommonInput
            placeholder="Enter your email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.submitButton}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ForgetModal;

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.button,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButtonText: {
    color: Colors.button,
    fontWeight: 'bold',
  },
});
