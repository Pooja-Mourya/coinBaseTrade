import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import CommonInput from '../../../common/CommonInput';
import CommonButton from '../../../common/CommonButton';
import {useSelector} from 'react-redux';
import apiService from '../../../redux/apiService';

const { width, height } = Dimensions.get('window');
const BankPay = ({route}) => {
  const { bankDetail } = route.params;
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);
 
  const [formData, setFormData] = useState({
    name: profileData?.user?.name,
    acNumber: '',
    ifsc: '',
    amount: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
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
        headers: {Authorization: token},
      });

      ToastAndroid.show(
        response.data?.message || 'Payment processed successfully!',
        ToastAndroid.SHORT,
      );
      navigation.navigate("Finance")
      setFormData({
        name: profileData?.user?.name,
        amount: '',
        acNumber: '',
        ifsc: '',
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
            screenHeader="Bank Deposit Method"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <View style={styles.row}>
              {/* Account Details */}
              <View style={styles.accountDetails}>
                <Text style={styles.heading}>Account Details of Admin</Text>
                <Text style={styles.bankInfo}>
                  Bank Name: {bankDetail.bankName}{'\n'}
                  A/c: {bankDetail.accountNumber}{'\n'}
                  IFSC: {bankDetail.ifscCode}
                </Text>
              </View>
              <ScrollView>
                {/* Form Inputs */}
                <View style={styles.formContainer}>
                  <CommonInput
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={text => handleChange('name', text)}
                    editable={false} 
                  />

                  <CommonInput
                    placeholder="Enter Account Number"
                    value={formData.acNumber}
                    onChangeText={text => handleChange('acNumber', text)}
                  />

                  <CommonInput
                    placeholder="Enter IFSC Code"
                    value={formData.ifsc}
                    onChangeText={text => handleChange('ifsc', text)}
                  />

                  <CommonInput
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    value={formData.amount}
                    onChangeText={text => handleChange('amount', text)}
                  />

                  <CommonButton
                    title="Proceed Payment"
                    onPress={handleSubmit}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      }
    />
  );
};

export default BankPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'column',
  },
  accountDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#eee',
  },
  bankInfo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#eee',
  },
  formContainer: {
    width: width*0.8,
  },
});
