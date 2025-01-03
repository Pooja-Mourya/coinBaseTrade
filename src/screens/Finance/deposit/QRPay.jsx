import {View, Text, Image, Alert, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import CommonButton from '../../../common/CommonButton';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');
const QRPay = () => {
  const navigation = useNavigation();

  const handleDownloadQR = async () => {
    try {
      const qrImagePath = RNFS.DocumentDirectoryPath + '/qr.png'; // Save the file to the app's directory
      const image = require('./qr.png'); // Ensure the QR image file is in the correct location
      await RNFS.copyFileAssets(image, qrImagePath); // Copy the file to the app's directory

      await CameraRoll.save(qrImagePath, {type: 'photo'}); // Save the image to the device's gallery
      Alert.alert('Success', 'QR Code saved to the gallery!');
    } catch (error) {
      console.error('Error saving QR:', error);
      Alert.alert('Error', 'Failed to save QR code.');
    }
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader="QR Method for Deposit"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image source={require('./qr.png')} style={styles.qrImage} />
              </View>
              {/* <CommonButton title="Download QR" onPress={handleDownloadQR} /> */}
            </View>
          </View>
        </>
      }
    />
  );
};

export default QRPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrImage: {
    width: width*0.9,
    height: 200,
    resizeMode: 'contain', // Ensures the image fits within the given dimensions
  },
});
