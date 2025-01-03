import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../common/AppHeader';
import CommonOption from '../../common/CommonOption';
import {useNavigation} from '@react-navigation/native';

const Trending = () => {
  const optionScreen = ['Portfolio', 'Buy Coin List', 'Sell Coin List'];
  const navigation = useNavigation();
  const handleScreen = key => {
    switch (key) {
      case 0:
        navigation.navigate('Portfolio');
        break;
      case 1:
        navigation.navigate('BuyCoin');
        break;
      case 2:
        navigation.navigate('SellCoin');
        break;
      default:
        break;
    }
  };
  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <AppHeader />
      <CommonOption optionScreen={optionScreen} onPress={handleScreen} />
    </LinearGradient>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
