import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../common/AppHeader';
import CommonOption from '../../common/CommonOption';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const optionScreen = [
    'Create user',
    'Users List',
    'Users Funds',
    'Users Withdraw',
    'Users Complains',
    'All Users Coins',
    'Generate Report',
  ];
  const navigation = useNavigation();

  const handleNavigateScreen = index => {
    switch (index) {
      case 0:
        navigation.navigate('Register');
        break;
      case 1:
        navigation.navigate('UserList');
        break;
      case 2:
        navigation.navigate('Funds');
        break;
      case 3:
        navigation.navigate('Withdraw');
        break;
      case 4:
        navigation.navigate('Complains');
        break;
      case 5:
        navigation.navigate('UsersCoins');
        break;
      case 6:
        navigation.navigate('GenerateReport');
        break;
      default:
        console.log('No screen available for this option.');
        break;
    }
  };

  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <AppHeader username={'User'} />
      <CommonOption
        optionScreen={optionScreen}
        onPress={handleNavigateScreen}
      />
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
