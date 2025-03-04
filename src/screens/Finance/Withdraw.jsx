import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../../common/CommonButton';
import {useSelector} from 'react-redux';
import apiService from '../../redux/apiService';
import CommonInput from '../../common/CommonInput';

const Withdraw = () => {
  const navigation = useNavigation();
  const profileData = useSelector(state => state.auth.profileData);
  const token = useSelector(state => state.auth.userData);

  const [input, setInput] = useState({
    userId: '',
    amount: '',
  });

  useEffect(() => {
    if (profileData?.user._id) {
      setInput(prevInput => ({
        ...prevInput,
        userId: profileData?.user?.userId,
      }));
    }
  }, [profileData?.user._id]);

  const handleOnChange = (name, value) => {
    setInput({
      ...input,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    });
  };

  const requestWithdraw = async () => {
    if (!input.amount || isNaN(input.amount)) {
      console.log('Please enter a valid amount.');
      return;
    }
    const data = {
      userId: profileData?.user._id,
      amount: +input.amount,
    };
    try {
      const res = await apiService({
        endpoint: `/withdraw/request/`,
        method:'POST',
        data,
        headers: {
          Authorization: token,
        },
      });
      setInput({ amount: "" }); 
      ToastAndroid.show('withdraw request successfully', ToastAndroid.SHORT);
      navigation.navigate('WithdrawList');
    } catch (error) {
      console.log('error withdraw:', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      <Text>{'\n'}</Text>
      <CommonInput
        placeholder={'Enter Amount'}
        onChangeText={value => handleOnChange('amount', value)}
        value={input.amount}
        keyboardType="numeric"
      />
      <CommonButton title={'Withdraw Request'} onPress={requestWithdraw} />
      <CommonButton
        onPress={() => navigation.navigate('WithdrawList')}
        title={'Withdraw List'}
      />
    </View>
  );
};

export default Withdraw;
