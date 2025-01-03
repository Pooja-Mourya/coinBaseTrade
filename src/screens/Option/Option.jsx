import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppHeader from '../../common/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CommonOption from '../../common/CommonOption';
import AnimatedShapes from './AnimatedShapes';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const Option = () => {
  const optionScreen = ['BTC', 'ETH'];
  const navigation = useNavigation();
  const handleOnClick = key => {
    switch (key) {
      case 0:
        navigation.navigate('BTC');
        break;
      case 1:
        navigation.navigate('ETH');
        break;
      default:
        console.log('no screen found yet');
        break;
    }
  };
  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <AppHeader username={'Option'} />

      <CommonOption optionScreen={optionScreen} onPress={handleOnClick} />
      <View style={styles.animatedContainer}>
        <AnimatedShapes />
      </View>
    </LinearGradient>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
