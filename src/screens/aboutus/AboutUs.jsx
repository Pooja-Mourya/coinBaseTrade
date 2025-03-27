import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ScreenHeader from '../../common/ScreenHeader';
import Container from '../../common/Container';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../common/AppColors';

const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'About Us'}
            onPress={() => navigation.goBack()}
          />
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.heading}>Introduction</Text>
              <Text style={styles.paragraph}>
                The exchange first launched in{' '}
                <Text style={styles.highlight}>India</Text> in April 2019,
                introducing support for the{' '}
                <Text style={styles.highlight}>UPI payment system</Text>.
              </Text>

              <Text style={styles.heading}>Our Products</Text>
              <Text style={styles.paragraph}>
                Coinbt provides products for retail and institutional
                cryptocurrency investors, as well as other users.
              </Text>

              <Text style={styles.heading}>Our Mission</Text>
              <Text style={styles.paragraph}>
                Coinbt is a secure online platform for buying, selling,
                transferring, and storing cryptocurrency (crypto). Our mission
                is to create an open financial system for the world and to be
                the leading global brand for helping people convert crypto into
                and out of their local currency. We make buying and
                selling crypto easy.
              </Text>

              <Text style={styles.heading}>Why Coinbt?</Text>
              <Text style={styles.paragraph}>
                Coinbt is the best app in India to invest in cryptocurrency.
                Very fast, reliable, smooth, and no bugs or lags at all. Also,
                payments are secure and instant.{' '}
                <Text style={styles.highlight}>Everything is wonderful.</Text>
              </Text>

              <Text style={styles.heading}>Withdrawal Limits</Text>
              <Text style={styles.paragraph}>
                You can withdraw between{' '}
                <Text style={styles.highlight}>INR 100</Text> and{' '}
                <Text style={styles.highlight}>INR 2,00,000</Text> in a day.
              </Text>

              <Text style={styles.heading}>Security Tips</Text>
              <Text style={styles.paragraph}>
                Like any digital asset, bitcoin and other cryptocurrencies are
                vulnerable to hackers and pump-and-dump scams. Knowing how to
                store your crypto investments can help reduce the chance of
                theft. Investors should consider storing crypto either with a
                trusted custodian or in a cold wallet.
              </Text>
            </View>
          </ScrollView>
        </>
      }
    />
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#f4f6f9', // Soft background for a clean look
  },
  contentContainer: {
    paddingBottom: 30, // Extra padding at the bottom for better scroll experience
  },
  card: {
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.button,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#62a', 
    padding: 10,
    backgroundColor:'#6666'
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: 'cyan',
    marginBottom: 14,
    textAlign: 'justify',
  },
  highlight: {
    color: 'pink', 
    fontWeight: '600',
  },
});
