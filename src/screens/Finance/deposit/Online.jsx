import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import CommonButton from '../../../common/CommonButton';
import {Colors} from '../../../common/AppColors';
import CommonInput from '../../../common/CommonInput';

const Online = ({route}) => {
  const { upiDetail } = route.params;
  const navigation = useNavigation();
  const profileData = useSelector(state => state.auth.profileData);
 
  const [amount, setAmount] = useState(0);
 
  const handleSubmit = async () => {
    if (!profileData?.user?.name) {
      ToastAndroid.show('User information is missing.', ToastAndroid.SHORT);
      return;
    }
    const upiUrl = `upi://pay?pa=${upiDetail.upiId}&pn=${encodeURIComponent(
      profileData.user.name,
    )}&mc=&tid=${Date.now()}&tr=TRANS_${Date.now()}&tn=${encodeURIComponent(
      '',
    )}&am=${amount}&cu=INR`;

    try {
      const supported = await Linking.canOpenURL(upiUrl);
      if (supported) {
        await Linking.openURL(upiUrl);
      } else {
        ToastAndroid.show(
          'No UPI apps available on the device.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('Payment initiation error:', error);
      ToastAndroid.show('Failed to initiate payment.', ToastAndroid.SHORT);
    }
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader="Online Payment"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.innerContainer}>
            <View style={styles.formContainer}>
              <CommonInput
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={text => setAmount(text)}
              />
              <CommonButton title="Proceed to Payment" onPress={handleSubmit} />
            </View>
          </View>
        </>
      }
    />
  );
};

export default Online;

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
  formContainer: {
    width: '100%',
  },
});
