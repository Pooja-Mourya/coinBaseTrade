import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import CommonButton from '../../common/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import apiService from '../../redux/apiService';

const Deposit = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const [bankDetail, setBankDetail] = useState({});
  const [upiDetail, setUpiDetail] = useState({});

  const getUpiAnBankDetail = async () => {
    if (!token) {
      ToastAndroid.show('Authorization token is missing!', ToastAndroid.SHORT);
      return;
    }
    try {
      const res = await apiService({
        endpoint: '/setting/getDetails',
        method: 'GET',
        headers: {Authorization: token},
      });
      setBankDetail(res.data?.bankDetails);
      setUpiDetail(res.data?.upiDetails);
      // console.log('bank detail res :', res.data?.bankDetails);
      // console.log('upi detail res :', res.data?.upiDetails);
    } catch (error) {
      console.log('bank detail error : ', error);
    }
  };

  useEffect(() => {
    getUpiAnBankDetail();
  }, []);
  return (
    <View>
      <CommonButton
        title={'Online Pay'}
        iconName={'currency-exchange'}
        onPress={() => navigation.navigate('Online', {upiDetail})}
      />
      <CommonButton
        title={'Using UPI ID'}
        iconName={'low-priority'}
        onPress={() => navigation.navigate('UPIPay', {upiDetail})}
      />
      <CommonButton
        title={'QR Scanner'}
        iconName={'crop-free'}
        onPress={() => navigation.navigate('QRPay')}
      />
      <CommonButton
        title={'Using Bank Detail'}
        iconName={'currency-rupee'}
        onPress={() => navigation.navigate('BankPay', {bankDetail})}
      />
    </View>
  );
};

export default Deposit;
