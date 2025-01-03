import {Dimensions, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from './AppColors';

const Container = ({content}) => {
  return (
    <>
      <StatusBar hidden />
      <LinearGradient colors={[Colors.container2, Colors.container1]} style={styles.container}>
        {content}
      </LinearGradient>
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1D1D83',
  },
});
