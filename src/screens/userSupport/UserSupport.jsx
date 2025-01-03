import {StyleSheet, Text, View, ToastAndroid, Alert} from 'react-native';
import React, {useState} from 'react';
import ScreenHeader from '../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import Container from '../../common/Container';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import apiService from '../../redux/apiService';

const UserSupport = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);

  const [formInput, setFormInput] = useState({
    email: profileData.user.email,
    subject: '',
    number: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (name, value) => {
    setFormInput({...formInput, [name]: value});
  };

  const handleSubmit = async () => {
    const {subject, message} = formInput;

    if (!subject  || !message) {
      ToastAndroid.show('All fields are required!', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const data = {
      email: profileData.user?.email,
      subject: formInput.subject,
      number: profileData.user?.mobile,
      message: formInput.message,
    };
    try {
      const res = await apiService({
        endpoint: '/support/create',
        method: 'POST',
        data,
        headers: {
          Authorization: token,
        },
      });
      if (res.message) {
        Alert.alert("Submit User Support Successfully")
        setFormInput({
          email: '',
          subject: '',
          number: '',
          message: '',
        });
        navigation.goBack();
      } else {
        ToastAndroid.show(
          'Failed to submit support request!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Support error:', error);
      ToastAndroid.show(
        'Something went wrong. Please try again!',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader="User Support"
            onPress={() => navigation.goBack()}
          />
          <View style={{marginTop: 10}}></View>
        
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18,
              padding: 10,
            }}>
            Email : {profileData.user.email}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18,
              padding: 10,
            }}>
            Number : {profileData.user.mobile}
          </Text>
          <CommonInput
            placeholder="Enter Subject"
            placeholderTextColor="#888"
            value={formInput.subject}
            onChangeText={value => handleOnChange('subject', value)}
          />
        
          <CommonInput
            placeholder="Enter your Message"
            placeholderTextColor="#888"
            value={formInput.message}
            onChangeText={value => handleOnChange('message', value)}
          />
          <CommonButton
            title={loading ? 'Loading...' : 'Submit'}
            backgroundColor={Colors.button}
            width="100%"
            textColor="#000"
            onPress={handleSubmit}
          />
        </>
      }
    />
  );
};

export default UserSupport;

const styles = StyleSheet.create({});
