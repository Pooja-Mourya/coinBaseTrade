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
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SpaceBetween from '../common/SpaceBetween';
import {Colors} from '../common/AppColors';
import CommonButton from '../common/CommonButton';
import CommonInput from '../common/CommonInput';
import OTPInput from './OtpInput';
import axios from 'axios';
import DocumentPickerComponent from '../common/DocumentPickerComponent';
import {statesAndDistricts} from "./CountryAndState"
import DateTimePicker from '@react-native-community/datetimepicker';


const {width} = Dimensions.get('window');

const SignUp = ({setScreenState, token}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    gender: '',
    mobile: '',
    dob: '',
    nationality: '',
    altMobile: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    panNo: '',
    aadharNo: 0,
    accNo: '',
    ifsc: '',
    branch: '',
    profileImg: '',
    aadharImg: '',
    panImg: '',
  });

  const [loader, setLoader] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Close the date picker
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      handleChange('dob', formattedDate);
    }
  };
  const handleChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'password', 'mobile', 'gender'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT);
        return;
      }
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (
        formData[key] &&
        typeof formData[key] === 'object' &&
        formData[key].uri
      ) {
        formDataToSend.append(key, {
          uri: formData[key].uri,
        });
      } else if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    setLoader(true);
    const formDataToObject = formData => {
      const obj = {};
      formData._parts.forEach(([key, value]) => {
        obj[key] = value;
      });
      return obj;
    };
    const plainObject = formDataToObject(formDataToSend);
    try {
      const response = await axios.post(
        'https://www.coinbt.in/api/v1/auth/register',
        plainObject,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );
      if (response.data.message) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        setOtpModal(true);
      }
      if (response.data.message === 'User already exists') {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        setOtpModal(false);
      }
    } catch (error) {
      setLoader(false);
      if (error.response) {
        ToastAndroid.show(
          error.response.data.message || 'API Error',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('Network Error', ToastAndroid.SHORT);
      }
      console.error('Error submitting form', error);
    }
  };

  const renderDocumentPreview = (title, file) => (
    <View style={{marginVertical: 10}}>
      <Text style={{color: '#fff', marginBottom: 5}}>{title}</Text>
      {file ? (
        <Image
          source={{uri: file.uri}}
          style={{
            width: width * 0.9,
            height: 200,
            borderWidth: 1,
            borderColor: Colors.button,
            resizeMode: 'contain',
          }}
        />
      ) : (
        <Text style={{color: '#aaa'}}>No file selected</Text>
      )}
    </View>
  );

  return (
    <>
      <Image source={require('../assets/img/logo.png')} />
      <Text style={styles.title}>Sign Up</Text>

      <ScrollView style={{width: '100%', height: '100%', flex: 1}}>
        <>
          <DocumentPickerComponent
            title="Upload Profile Document"
            buttonTitle="Profile Document"
            fileName={formData.profileImg?.name}
            setFileName={name => setFormData({...formData, profileImg: {name}})}
            fileUri={formData.profileImg?.uri}
            setFileUri={uri => setFormData({...formData, profileImg: {uri}})}
          />
          {renderDocumentPreview('Profile Document', formData.profileImg)}

          <DocumentPickerComponent
            title="Upload Pan Document"
            buttonTitle="Pan Document"
            fileName={formData.panImg?.name}
            setFileName={name => setFormData({...formData, panImg: {name}})}
            fileUri={formData.panImg?.uri}
            setFileUri={uri => setFormData({...formData, panImg: {uri}})}
          />
          {renderDocumentPreview('Pan Document', formData.panImg)}

          <DocumentPickerComponent
            title="Upload Aadhar Document"
            buttonTitle="Aadhar Document"
            fileName={formData.aadharImg?.name}
            setFileName={name => setFormData({...formData, aadharImg: {name}})}
            fileUri={formData.aadharImg?.uri}
            setFileUri={uri => setFormData({...formData, aadharImg: {uri}})}
          />
          {renderDocumentPreview('Aadhar Document', formData.aadharImg)}

          <DocumentPickerComponent
            title="Upload Passbook Document"
            buttonTitle="Passbook Document"
            fileName={formData.passbookDoc?.name}
            setFileName={name =>
              setFormData({...formData, passbookDoc: {name}})
            }
            fileUri={formData.passbookDoc?.uri}
            setFileUri={uri => setFormData({...formData, passbookDoc: {uri}})}
          />
          {renderDocumentPreview('Passbook Document', formData.passbookDoc)}
        </>
        <>
          {Object.keys(formData).map(key => {
            if (
              ['profileImg', 'panImg', 'aadharImg', 'passbookDoc'].includes(key)
            ) {
              return null;
            }
            if (key === 'gender') {
              return (
                <View key={key} style={{marginVertical: 10}}>
                  <Text style={{color: '#fff'}}>Gender</Text>
                  <Picker
                    selectedValue={formData[key]}
                    onValueChange={value => handleChange(key, value)}
                    style={{
                      color: '#fff',
                      backgroundColor: '#2C2C85',
                    }}>
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
              );
            }

            if (key === "dob") {
              return (
                <View key={key} style={{marginVertical: 10}}>
                  <Text style={{color: '#fff'}}>Date of Birth</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{
                      backgroundColor: '#2C2C85',
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 5,
                    }}>
                    <Text style={{color: '#fff'}}>
                      {formData.dob || 'Select Date of Birth'}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.dob ? new Date(formData.dob) : new Date()}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      maximumDate={new Date()} // Prevent future dates
                    />
                  )}
                </View>
              );
            }
            
            if (key === 'state') {
              return (
                <View key={key} style={{marginVertical: 10}}>
                  <Picker
                    selectedValue={formData.state}
                    onValueChange={value => handleChange(key, value)}
                    style={{
                      color: '#fff',
                      backgroundColor: '#2C2C85',
                    }}>
                    <Picker.Item label="Select Country" value="" />
                    {Object.keys(statesAndDistricts).map(state => (
                      <Picker.Item key={state} label={state} value={state} />
                    ))}
                  </Picker>
                </View>
              );
            }

            if (key === 'city') {
              const districts = statesAndDistricts[formData.state] || [];
              return (
                <View key={key} style={{marginVertical: 10}}>
                  <Picker
                    selectedValue={formData.city}
                    onValueChange={value => handleChange(key, value)}
                    style={{
                      color: '#fff',
                      backgroundColor: '#2C2C85',
                    }}
                    enabled={districts.length > 0}>
                    <Picker.Item label="Select State" value="" />
                    {districts.map(district => (
                      <Picker.Item
                        key={district}
                        label={district}
                        value={district}
                      />
                    ))}
                  </Picker>
                </View>
              );
            }

            return (
              <View key={key}>
                <CommonInput
                  value={formData[key]}
                  onChangeText={value => handleChange(key, value)}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </View>
            );
          })}
        </>

        <SpaceBetween
          children={
            <CommonButton
              title={
                !loader ? (
                  'Continue'
                ) : (
                  <ActivityIndicator size={'small'} color={'#000'} />
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
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.signInText}>Already have an account ? </Text>
          <TouchableOpacity onPress={() => setScreenState('signIn')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
      {otpModal && (
        <OTPInput
          visible={otpModal}
          emailAll={formData.email}
          onClose={() => setOtpModal(false)}
          setScreenState={setScreenState}
        />
      )}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 30,
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
