import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CommonOption from '../../common/CommonOption';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../common/AppHeader';
import {useSelector} from 'react-redux';
import SpaceBetween from '../../common/SpaceBetween';
import {Colors} from '../../common/AppColors';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import {useNavigation} from '@react-navigation/native';
import UserBalanceHistory from './UserBalanceHistory';

const optionScreen = ['User Balance', 'Deposit Balance', 'Withdraw Balance'];

const Finance = () => {
  const profileData = useSelector(state => state.auth.profileData);
  const navigation = useNavigation();
  const [selectedScreen, setSelectedScreen] = useState(null);

  const handleOptionScreen = key => {
    const selectedOption = optionScreen[key];

    if (selectedScreen && selectedScreen.screenName === selectedOption) {
      setSelectedScreen(null);
      return;
    }

    switch (key) {
      case 0:
        setSelectedScreen({
          screenName: 'User Balance',
          content: <UserBalanceHistory />,
        });
        break;

      case 1:
        setSelectedScreen({
          screenName: 'Deposit Balance',
          content: <Deposit />,
        });
        break;

      case 2:
        setSelectedScreen({
          screenName: 'Withdraw Balance',
          content: <Withdraw />,
        });
        break;

      default:
        console.warn('Invalid key provided to handleOptionScreen:', key);
        break;
    }
  };

  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <AppHeader username={'Finance'} />
      {/* <View style={{backgroundColor: Colors.card2, padding: 30}}>
        <SpaceBetween
          children={
            <>
              <Text style={styles.textStyle}>Name</Text>
              <Text style={styles.textStyle}>{profileData.user.name}</Text>
            </>
          }
        />
        <SpaceBetween
          children={
            <>
              <Text style={styles.textStyle}>Email</Text>
              <Text style={styles.textStyle}>{profileData.user.email}</Text>
            </>
          }
        />
        <SpaceBetween
          children={
            <>
              <Text style={styles.textStyle}>Mobile</Text>
              <Text style={styles.textStyle}>{profileData.user.mobile}</Text>
            </>
          }
        />
        <SpaceBetween
          children={
            <>
              <Text style={styles.textStyle}>Address</Text>
              <Text style={styles.textStyle}>{profileData.user.address}</Text>
            </>
          }
        />
      </View> */}
      <ScrollView>
        <CommonOption
          optionScreen={optionScreen}
          onPress={handleOptionScreen}
        />

        {selectedScreen && (
          <View style={styles.contentContainer}>
            <Text style={styles.screenTitle}>{selectedScreen.screenName}</Text>
            {selectedScreen.content}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default Finance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    color: '#fff',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: Colors.card2,
    borderRadius: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});
