import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import CommonInput from '../../../common/CommonInput';
import DatePicker from 'react-native-datepicker';

const { width, height } = Dimensions.get('window');
const GenerateReport = () => {
  const navigation = useNavigation();
  const [inputFields, setInputFields] = useState({
    userId: '',
    settlementDate: '',
    contractNoteNo: '',
    orderNo: '',
    exchange: '',
    sellPrice: '',
    buyPrice: '',
    quantity: '',
    exchangeCharge: '',
    tdsCharge: '',
  });

  const handleOnChange = (name, value) => {
    setInputFields(prevFields => ({...prevFields, [name]: value}));
  };
  const formFields = [
    {name: 'userId', placeholder: 'Select User', isDate: false},
    {name: 'settlementDate', placeholder: 'dd-mm-yyyy', isDate: true},
    {
      name: 'contractNoteNo',
      placeholder: 'Enter Contract Note No.',
      isDate: false,
    },
    {name: 'orderNo', placeholder: 'Enter Order No.', isDate: false},
    {name: 'exchange', placeholder: 'Enter Exchange', isDate: false},
    {name: 'sellPrice', placeholder: 'Enter Sell Price', isDate: false},
    {name: 'buyPrice', placeholder: 'Enter Buy Price', isDate: false},
    {name: 'quantity', placeholder: 'Enter Quantity', isDate: false},
    {
      name: 'exchangeCharge',
      placeholder: 'Enter Exchange Charge',
      isDate: false,
    },
    {name: 'tdsCharge', placeholder: 'Enter TDS Charge', isDate: false},
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log(inputFields);
  };
  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'Reports'}
            onPress={() => navigation.goBack()}
          />
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Generate Report</Text>

              {formFields.map(field =>
                field.isDate ? (
                  <DatePicker
                    key={field.name}
                    style={styles.datePicker}
                    date={inputFields[field.name]}
                    mode="date"
                    placeholder={field.placeholder}
                    format="DD-MM-YYYY"
                    onDateChange={date => handleOnChange(field.name, date)}
                  />
                ) : (
                  <CommonInput
                    key={field.name}
                    value={inputFields[field.name]}
                    onChangeText={value => handleOnChange(field.name, value)}
                    placeholder={field.placeholder}
                  />
                ),
              )}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      }
    />
  );
};

export default GenerateReport;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: width*0.9,
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#7b61ff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical:20
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
