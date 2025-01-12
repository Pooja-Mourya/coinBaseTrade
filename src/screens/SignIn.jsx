import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import SpaceBetween from '../common/SpaceBetween';
import {Colors} from '../common/AppColors';
import CommonButton from '../common/CommonButton';
import CommonInput from '../common/CommonInput';
import {useNavigation} from '@react-navigation/native';
import ForgetModal from './ForgetModal';
import apiService from '../redux/apiService';
import { useDispatch } from 'react-redux';
import { AllData, IsAdmin, UserData } from '../redux/AuthSlice';

const SignIn = ({setScreenState}) => {
  const navigation = useNavigation();
  const [inputField, setInputField] = useState({
    email: 'dprajapati15302@gmail.com',
    password: '123456',
    // email: '',
    // password: '',
  });
  const [loading, setLoading] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const handleOnchange = (name, value) => {
    setInputField({...inputField, [name]: value});
  };

  const dispatch = useDispatch()
  const handleSignIn = async () => {
    const endpoint = '/auth/login';
    const data = {email: inputField.email, password: inputField.password};
    setLoading(true);
    try {
      const response = await apiService({
        endpoint,
        method: 'POST',
        data,
      });
      if (response.AccessToken){
        ToastAndroid.show('Sign-in successful!', ToastAndroid.SHORT);
        setLoading(false);
        navigation.navigate('HomeTabs');
        const token = response.AccessToken;
        dispatch(UserData(token))
        dispatch(IsAdmin(response.user.role))
        dispatch(AllData(response))
        return response;
      }
    } catch (error) {
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
      ToastAndroid.show(
        error.details.message,
        ToastAndroid.SHORT,
      );
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  return (
    <>
      <Image source={require('../assets/img/logo.png')} />
      <Text style={styles.title}>Sign In</Text>
      <CommonInput
        value={inputField.email}
        onChangeText={value => handleOnchange('email', value)}
        placeholder="Email"
      />
      <CommonInput
        value={inputField.password}
        onChangeText={value => handleOnchange('password', value)}
        placeholder="Password"
        secureTextEntry
      />
      <Text>{'\n'}</Text>
      <SpaceBetween
        children={
          <CommonButton
            title={loading ? 'Loading...' : 'Sing In'}
            backgroundColor={Colors.button}
            width={'100%'}
            textColor={'#000'}
            onPress={handleSignIn}
          />
        }
      />
      <TouchableOpacity onPress={() => setForgetModal(true)}>
        <Text style={styles.passwordStyle}>Forgot password</Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <SpaceBetween
        children={
          <>
            <Text style={styles.lineStyle}></Text>
            <Text style={styles.divider}>Or continue with</Text>
            <Text style={styles.lineStyle}></Text>
          </>
        }
      />
      <Text>{'\n'}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={styles.signInText}>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => setScreenState('signUp')}>
          <Text style={styles.signInLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {forgetModal && (
        <ForgetModal
          visible={forgetModal}
          onClose={() => setForgetModal(false)}
        />
      )}
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  lineStyle: {
    width: '30%',
    backgroundColor: Colors.textColor,
    height: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 30,
  },

  divider: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -12,
  },

  signInText: {
    color: '#fff',
    textAlign: 'center',
  },
  signInLink: {
    color: '#FDCB5A',
    fontWeight: 'bold',
  },
  passwordStyle: {
    justifyContent: 'right',
    color: Colors.button,
    fontWeight: '600',
    fontSize: 16,
  },
});
