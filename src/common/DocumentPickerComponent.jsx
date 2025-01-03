import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Colors} from './AppColors';

const DocumentPickerComponent = ({title, buttonTitle, fileName, setFileName, fileUri, setFileUri}) => {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result && result[0]) {
        const selectedFile = result[0];
        setFileName(selectedFile.name);
        setFileUri(selectedFile.uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled');
      } else {
        Alert.alert('Error', 'Failed to pick document');
        console.error(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickDocument} style={styles.button}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      {fileName && <Text style={styles.fileName}>{fileName}</Text>}
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
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileName: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default DocumentPickerComponent;
