import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../common/AppColors';
import CommonInput from '../common/CommonInput';
import {useNavigation} from '@react-navigation/native';
import apiService from '../redux/apiService';
import {useSelector} from 'react-redux';

const OtpInput = ({visible, onClose, emailAll}) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = text => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setOtp(sanitizedText);
  };

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSubmit = async () => {
    if (!otp) {
      ToastAndroid.show('Please enter the OTP.', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    const data = {email: emailAll, otp};

    try {
      const response = await apiService({
        endpoint: '/auth/verification',
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data,
      });

      if (response.message) {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }

      if (
        response.data?.message === 'already verified' ||
        response.data?.message === 'otp verified successfully'
      ) {
        navigation.navigate('SignIn');
      } else {
        navigation.navigate('Splash');
      }
    } catch (error) {
      const errorMessage =
        error.details?.error?._message ||
        'OTP verification failed. Please try again.';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      console.error('OTP verification error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay} />
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeIcon}>❌</Text>
        </TouchableOpacity>
        <Text style={styles.instructionText}>
          Enter the OTP sent to your email:
        </Text>
        <Text style={styles.emailText}>{emailAll}</Text>
        <CommonInput
          value={otp}
          onChangeText={handleChange}
          placeholder="Enter OTP"
          textAlign="center"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Submit'
            )}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    height: 300,
  },
  closeIcon: {
    textAlign: 'right',
    marginLeft: '90%',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 50,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  emailText: {
    color: '#000',
    fontWeight: '500',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.card1,
    borderRadius: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});
