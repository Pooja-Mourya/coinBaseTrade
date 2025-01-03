import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
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

const BottomModal = ({visible, onClose, children, otp, email}) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const data = {
      email: email,
      otp: otp.join(''),
    };
    console.log('data otp : ', data);
    try {
      const response = await apiService({
        endpoint: '/auth/verification',
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data,
      });
      console.log('otp : ', response);
      if (response.message) {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }

      // if (
      //   response.data.message === 'already verified' ||
      //   response.data.message === 'otp verified successfully'
      // ) {
      //   navigation.navigate('SignIn');
      // }
      navigation.navigate('Splash');
    } catch (error) {
      ToastAndroid.show(
        'OTP verification failed. Try again.',
        ToastAndroid.SHORT,
      );
      ToastAndroid.show(error.details?.error?._message, ToastAndroid.SHORT);
      console.error('OTP verification error:', error.details?.error?._message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
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
          <Text
            style={{
              textAlign: 'right',
              marginLeft: '90%',
              padding: 10,
              backgroundColor: '#eeee',
              borderRadius: 50,
            }}>
            ❌
          </Text>
        </TouchableOpacity>
        {children}
        <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
          <Text style={styles.closeText}>
            {!loading ? (
              'Submit'
            ) : (
              <ActivityIndicator size={'small'} color={'#fff'} />
            )}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const OTPInput = ({modal, closeModal}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // if (text && index < otp.length - 1 && inputs.current[index + 1]) {
    //   inputs.current[index + 1].focus();
    // }
  };

  const handleBackspace = (text, index) => {
    // if (!text && index > 0 && inputs.current[index - 1]) {
    //   inputs.current[index - 1].focus();
    // }
  };

  return (
    <View style={styles.pageContainer}>
      <BottomModal visible={modal} onClose={closeModal} otp={otp} email={email}>
        <Text>{'\n'}</Text>
        <CommonInput
          value={email}
          onChangeText={value => setEmail(value)}
          placeholder={'Enter Email'}
        />
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={({nativeEvent}) =>
                nativeEvent.key === 'Backspace'
                  ? handleBackspace(digit, index)
                  : null
              }
              style={styles.input}
              keyboardType="numeric||string"
              maxLength={1}
            />
          ))}
        </View>
      </BottomModal>
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.card1,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 5,
    color: '#000',
  },
});
