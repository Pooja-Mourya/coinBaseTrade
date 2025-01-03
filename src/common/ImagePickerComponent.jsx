import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Colors} from './AppColors';

const ImagePickerComponent = ({title, buttonTitle, imageUri, setImageUri, imgName, setImgName}) => {
  const pickImageFromLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImgName(selectedImage.fileName);
      setImageUri(selectedImage.uri);
    } else if (result.didCancel) {
      console.log('Image picking cancelled');
    } else if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImageFromLibrary} style={styles.button}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <Text style={{color: '#fff'}}>{imgName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.card2,
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    marginTop: 5,
    width: '100%',
    height: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});

export default ImagePickerComponent;
