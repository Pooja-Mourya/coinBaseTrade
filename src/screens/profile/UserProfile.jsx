import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import CommonButton from '../../common/CommonButton';
import SpaceBetween from '../../common/SpaceBetween';
import CommonInput from '../../common/CommonInput';
import DocumentPickerComponent from '../../common/DocumentPickerComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../common/AppColors';
import ScreenHeader from '../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import Container from '../../common/Container';
import { AllData, updatedProfile } from '../../redux/AuthSlice';

const UserProfile = () => {
  const profileData = useSelector(state => state.auth.profileData);

  const token = useSelector(state => state.auth.authorization);
  const dispatch = useDispatch()
  const navigation = useNavigation();
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
    city: '',
    state: '',
    pincode: '',
    panNo: '',
    aadharNo: '',
    accNo: '',
    ifsc: '',
    branch: '',
    profileImg: '',
    aadharImg: '',
    panImg: '',
    passbookImg: '',
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  // const handleSubmit = async () => {
  //   const requiredFields = ['name', 'email', 'password', 'mobile', 'gender'];

  //   // Validate required fields
  //   for (let field of requiredFields) {
  //     if (!formData[field]) {
  //       ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT);
  //       return;
  //     }
  //   }

  //   const formDataToSend = new FormData();
  //   Object.keys(formData).forEach(key => {
  //     if (
  //       formData[key] &&
  //       typeof formData[key] === 'object' &&
  //       formData[key].uri
  //     ) {
  //       formDataToSend.append(key, {
  //         uri: formData[key].uri,
  //       });
  //     } else if (formData[key]) {
  //       formDataToSend.append(key, formData[key]);
  //     }
  //   });

  //   setLoader(true);
  //   const formDataToObject = formData => {
  //     const obj = {};
  //     formData._parts.forEach(([key, value]) => {
  //       obj[key] = value;
  //     });
  //     return obj;
  //   };
  //   const plainObject = formDataToObject(formDataToSend);

  //   setLoader(true);

  //   try {
  //     const response = await axios.put(
  //       `https://coinbt.in/api/v1/auth/update/${profileData?.user?._id}`,
  //       plainObject,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     console.log('plainObject : ', plainObject);
  //     setLoader(false);
  //     navigation.goBack();
  //     ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
  //   } catch (error) {
  //     setLoader(false);

  //     // Handle errors effectively
  //     const errorMessage =
  //       error?.response?.data?.message || 'Error submitting form';
  //     ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  //     console.error('Error submitting form:', error);
  //   }
  // };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'password', 'mobile', 'gender'];

    // Validate required fields
    for (let field of requiredFields) {
      if (!formData[field]) {
        ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT);
        return;
      }
    }

    const formDataToSend = new FormData();

    // Append regular fields
    Object.keys(formData).forEach(key => {
      if (!key.endsWith('Img') && formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append image fields
    ['profileImg', 'panImg', 'aadharImg', 'passbookImg'].forEach(key => {
      const file = formData[key];
      if (file && file.uri) {
        formDataToSend.append(key, {
          uri: file.uri,
          type: 'image/jpeg', // Change the MIME type if needed
          name: file.name || `${key}.jpg`, // Default name if none is provided
        });
      }
    });

    setLoader(true);
    try {
      const response = await axios.put(
        `https://coinbt.in/api/v1/auth/update/${profileData?.user?._id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );
      // console.log(response.data.user);
      setLoader(false);
      navigation.goBack();
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } catch (error) {
      setLoader(false);

      const errorMessage =
        error?.response?.data?.message || 'Error submitting form';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (profileData) {
      setFormData({
        ...formData,
        name: profileData.user?.name || '',
        email: profileData.user?.email || '',
        password: profileData.user?.password || '',
        profession: profileData.user?.profession || '',
        gender: profileData.user?.gender || '',
        mobile: profileData.user?.mobile || '',
        dob: profileData.user?.dob || '',
        nationality: profileData.user?.nationality || '',
        altMobile: profileData.user?.altMobile || '',
        address: profileData.user?.address || '',
        city: profileData.user?.city || '',
        state: profileData.user?.state || '',
        pincode: profileData.user?.pincode || '',
        panNo: profileData.user?.panNo || '',
        aadharNo: profileData.user?.aadharNo || '',
        accNo: profileData.user?.accNo || '',
        ifsc: profileData.user?.ifsc || '',
        branch: profileData.user?.branch || '',
        profileImg:
          'https://coinbt.in/api/v1/auth/update/' + formData.profileImg || '',
        aadharImg:
          'https://coinbt.in/api/v1/auth/update/' + formData.aadharImg || '',
        panImg: 'https://coinbt.in/api/v1/auth/update/' + formData.panImg || '',
        passbookImg:
          'https://coinbt.in/api/v1/auth/update/' + formData.passbookImg || '',
      });
    }
  }, [profileData]);

  const {width} = Dimensions.get('window');

  const renderDocumentPreview = (title, file, uploadedFile) => {
    const uri = file?.uri;
    return (
      <View style={{marginVertical: 10}}>
        <Text style={{color: '#fff'}}>{title}</Text>
        {uri ? (
          <Image
            source={{uri}}
            style={{
              width: width * 0.9, // 90% of the screen width
              height: 200,
              borderWidth: 1,
              borderColor: Colors.button,
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Image
            source={{uri: uploadedFile}}
            style={{
              width: width * 0.9, // 90% of the screen width
              height: 200,
              borderWidth: 1,
              borderColor: Colors.button,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
    );
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={`${profileData?.user?.name} Profile`}
            onPress={() => navigation.goBack()}
          />
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <>
              <DocumentPickerComponent
                title="Upload Profile Document"
                buttonTitle="Profile Document"
                fileName={formData.profileImg?.name}
                setFileName={name =>
                  setFormData({
                    ...formData,
                    profileImg: {...formData.profileImg, name},
                  })
                }
                fileUri={formData.profileImg?.uri}
                setFileUri={uri =>
                  setFormData({
                    ...formData,
                    profileImg: {...formData.profileImg, uri},
                  })
                }
              />
              {renderDocumentPreview(
                'Profile Document',
                formData.profileImg,
                `https://www.coinbt.in/api/uploads/${profileData?.user?.profileImg}`,
              )}

              <DocumentPickerComponent
                title="Upload Pan Document"
                buttonTitle="Pan Document"
                fileName={formData.panImg?.name}
                setFileName={name =>
                  setFormData({...formData, panImg: {...formData.panImg, name}})
                }
                fileUri={formData.panImg?.uri}
                setFileUri={uri =>
                  setFormData({...formData, panImg: {...formData.panImg, uri}})
                }
              />
              {renderDocumentPreview(
                'Pan Document',
                formData.panImg,
                `https://www.coinbt.in/api/uploads/${profileData?.user?.panImg}`,
              )}

              <DocumentPickerComponent
                title="Upload Aadhar Document"
                buttonTitle="Aadhar Document"
                fileName={formData.aadharImg?.name}
                setFileName={name =>
                  setFormData({
                    ...formData,
                    aadharImg: {...formData.aadharImg, name},
                  })
                }
                fileUri={formData.aadharImg?.uri}
                setFileUri={uri =>
                  setFormData({
                    ...formData,
                    aadharImg: {...formData.aadharImg, uri},
                  })
                }
              />
              {renderDocumentPreview(
                'Aadhar Document',
                formData.aadharImg,
                `https://www.coinbt.in/api/uploads/${profileData?.user?.aadharImg}`,
              )}
            </>
            <>
              <DocumentPickerComponent
                title="Upload Passbook Document"
                buttonTitle="Passbook Document"
                fileName={formData.passbookImg?.name}
                setFileName={name =>
                  setFormData({
                    ...formData,
                    passbookImg: {...formData.passbookImg, name},
                  })
                }
                fileUri={formData.passbookImg?.uri}
                setFileUri={uri =>
                  setFormData({
                    ...formData,
                    passbookImg: {...formData.passbookImg, uri},
                  })
                }
              />
              {renderDocumentPreview(
                'Passbook Document',
                formData.passbookImg,
                `https://www.coinbt.in/api/uploads/${profileData?.user?.passbookImg}`,
              )}
            </>
            {Object.keys(formData)
              .filter(key => !key.endsWith('Img'))
              .map(key => (
                <View key={key}>
                  <CommonInput
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    labelStyle={{color: '#fff'}}
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
          </ScrollView>
        </>
      }
    />
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
