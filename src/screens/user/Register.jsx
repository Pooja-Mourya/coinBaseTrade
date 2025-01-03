import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {baseUrl} from '../../redux/apiService';
import axios from 'axios';
import CommonButton from '../../common/CommonButton';
import SpaceBetween from '../../common/SpaceBetween';
import CommonInput from '../../common/CommonInput';
import ImagePickerComponent from '../../common/ImagePickerComponent';
import {Colors} from '../../common/AppColors';
import Container from '../../common/Container';
import ScreenHeader from '../../common/ScreenHeader';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation()
  const [formData, setFormData] = useState({
    name: 'pooja',
    email: 'puja.mourya575@gmail.com',
    password: '123456789',
    profession: '',
    gender: 'Female',
    mobile: 6265229371,
    dob: '',
    nationality: '',
    altMobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNo: '',
    aadharNo: '',
    accNo: '',
    ifsc: '',
    branch: '',
    profileImg: null,
    aadharImg: null,
    panImg: null,
  });
  const [image, setImage] = useState(null);
  const [panImg, setPanImg] = useState(null);
  const [adharImg, setAdharImg] = useState(null);
  const [loader, setLoader] = useState(false);
  //   const [otpModal, setOtpModal] = useState();

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'password', 'mobile', 'gender'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT);
        return;
      }
    }
    const finalData = {...formData};
    const appendFileAsObject = (file, key) => {
      if (file) {
        finalData[key] = JSON.stringify(file);
      }
    };

    appendFileAsObject(image, 'profileImg');
    appendFileAsObject(panImg, 'panImg');
    appendFileAsObject(adharImg, 'aadharImg');
    setLoader(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, finalData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoader(false);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Error submitting form', ToastAndroid.SHORT);
      console.error('Error submitting form', error);
    }
  };

  return (
    <Container
      content={
        <>
        <ScreenHeader screenHeader={"Register New User"} onPress={()=>navigation.goBack()}/>
          <SpaceBetween
            children={
              <>
                <ImagePickerComponent
                  buttonTitle="Profile Image"
                  imageUri={image}
                  setImageUri={setImage}
                />
                <ImagePickerComponent
                  buttonTitle="Upload Pan"
                  imageUri={panImg}
                  setImageUri={setPanImg}
                />
                <ImagePickerComponent
                  buttonTitle="Upload Aadhar"
                  imageUri={adharImg}
                  setImageUri={setAdharImg}
                />
              </>
            }
          />
          <ScrollView
            style={{width: '100%', height: '100%', bottomMargin: 0, flex: 1}}>
            {Object.keys(formData).map(key => (
              <View key={key}>
                <CommonInput
                  value={formData[key]}
                  onChangeText={value => handleChange(key, value)}
                  placeholder={key}
                />
              </View>
            ))}

            <SpaceBetween
              children={
                <CommonButton
                  title={
                    !loader ? (
                      'Continue'
                    ) : (
                      <ActivityIndicator size={'small'} color={'#ffff'} />
                    )
                  }
                  backgroundColor={Colors.button}
                  width={'80%'}
                  textColor={'#000'}
                  buttonStyle={{flex: 1, justifyContent: 'center'}}
                  onPress={handleSubmit}
                />
              }
            />
            <Text>{'\n'}</Text>
          </ScrollView>
        </>
      }
    />
  );
};

export default Register;

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
});
