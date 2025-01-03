import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../common/Container';
import Heading from '../common/Heading';

const TextHook = () => {
  const [input, setInput] = useState({name: '', surname: ''});
  const [focus, setFocus] = useState(false);

  const handleInputChange = (field, value) => {
    setInput(prevState => ({...prevState, [field]: value}));
  };

  return (
    <Container
      backgroundColor={'cyan'}
      content={
        <>
          <Heading heading={'Text Hook'} />
          <TextInput
            placeholder="Enter your name"
            value={input.name}
            onChangeText={n => handleInputChange('name', n)}
            style={[styles.input, focus && styles.inputFocused]}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            keyboardType="decimal-pad"
            returnKeyType="emergency-call"
            autoCapitalize="sentences"
            autoCorrect={false}
            editable={true}
            maxLength={40}
            placeholderTextColor="gray"
            selectionColor="blue"
            underlineColorAndroid="transparent"
            textContentType="name"
            clearButtonMode="while-editing"
            accessibilityLabel="Name input field"
          />

          <TextInput
            placeholder="Enter your surname"
            value={input.surname}
            onChangeText={n => handleInputChange('surname', n)}
            style={styles.input}
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            editable={true}
            maxLength={40}
            placeholderTextColor="gray"
            selectionColor="blue"
            underlineColorAndroid="transparent"
            textContentType="familyName"
            clearButtonMode="while-editing"
            accessibilityLabel="Surname input field"
          />

          <Text style={styles.displayText}>
            Name: {input.name} {input.surname}
          </Text>
        </>
      }></Container>
  );
};

export default TextHook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: 'blue',
  },
  displayText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
