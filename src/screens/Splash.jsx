import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../common/Container';
import SpaceBetween from '../common/SpaceBetween';
import CommonButton from '../common/CommonButton';
import {Colors} from '../common/AppColors';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Splash = () => {
  const [screenState, setScreenState] = useState('splash');

  return (
    <Container
      content={
        <>
          {screenState === 'splash' && (
            <>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/img/splashImg.png')}
                  style={styles.image}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>Stock Trading Suite</Text>
                <Text style={styles.subtitle}>
                  Streamline your investment decisions {'\n'} with expert
                  guidance.
                </Text>
              </View>

              <SpaceBetween>
                <CommonButton
                  title={'Sign In'}
                  backgroundColor={Colors.button}
                  width={'45%'}
                  textColor={'#000'}
                  onPress={() => {
                    setScreenState('signIn');
                  }}
                />
                <CommonButton
                  title={'Sign Up'}
                  backgroundColor={Colors.button}
                  width={'45%'}
                  textColor={'#000'}
                  onPress={() => {
                    setScreenState('signUp');
                  }}
                />
              </SpaceBetween>
            </>
          )}

          {screenState === 'signUp' && (
            <SignUp setScreenState={setScreenState} />
          )}
          {screenState === 'signIn' && (
            <SignIn setScreenState={setScreenState} />
          )}
        </>
      }
    />
  );
};

export default Splash;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: '10%', // Add some space below the image
  },
  image: {
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center', // Center align text
    marginBottom: "40%", // Space between text and buttons
    paddingHorizontal: 20, // Add padding for better text layout
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Darker text color
    marginBottom: 10, // Space between title and subtitle
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.textColor,
    lineHeight: 22,
  },
});
