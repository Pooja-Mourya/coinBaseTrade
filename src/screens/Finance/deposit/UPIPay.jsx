import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import CommonInput from '../../../common/CommonInput';
import CommonButton from '../../../common/CommonButton';
import { Colors } from '../../../common/AppColors';
import apiService from '../../../redux/apiService';

const UPIPay = ({route}) => {
  const { upiDetail } = route.params;
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);

  const [formData, setFormData] = useState({
    upi: '',
    name: profileData?.user?.name || '',
    utr: '',
    amount: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCopyUPI = () => {
    // const upiId = 'coinbastrade@axl';
    Clipboard.setString(upiDetail.upiId);
    ToastAndroid.show('UPI ID copied to clipboard!', ToastAndroid.SHORT);
  };

  const handleSubmit = async () => {
    if (!token) {
      ToastAndroid.show('Authorization token is missing!', ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await apiService({
        endpoint: '/razorpay/create-order',
        method: 'POST',
        data: formData,
        headers: { Authorization: token },
      });

      ToastAndroid.show(
        response.data?.message || 'Payment processed successfully!',
        ToastAndroid.SHORT,
      );
      navigation.navigate('Finance');
      setFormData({
        upi: '',
        name: profileData?.user?.name || '',
        utr: '',
        amount: '',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred!';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader="UPI Method for Deposit"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.innerContainer}>
            <View style={styles.upiContainer}>
              <Text style={styles.upiText}>UPI: coinbastrade@axl</Text>
              <Button title="Copy" onPress={handleCopyUPI} color="#28a745" />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.label}>UPI Id</Text>
              <CommonInput
                value={formData.upi}
                onChangeText={text => handleChange('upi', text)}
                placeholder="Enter UPI Id"
              />
              <Text style={styles.label}>Name</Text>
              <CommonInput
                value={formData.name}
                onChangeText={text => handleChange('name', text)}
                placeholder="Name"
                editable={false}
              />
              <Text style={styles.label}>UTR Number</Text>
              <CommonInput
                value={formData.utr}
                onChangeText={text => handleChange('utr', text)}
                placeholder="Enter UTR Number"
              />
              <Text style={styles.label}>Amount</Text>
              <CommonInput
                value={formData.amount}
                onChangeText={text => handleChange('amount', text)}
                placeholder="Enter Amount"
                keyboardType="numeric"
              />
              <CommonButton title="Proceed Payment" onPress={handleSubmit} />
            </View>
          </View>
        </>
      }
    />
  );
};

export default UPIPay;

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: Colors.container2,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  upiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  upiText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#eee',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#eee',
  },
});
