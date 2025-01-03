import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenHeader from '../../../common/ScreenHeader';
import Container from '../../../common/Container';
import { useNavigation } from '@react-navigation/native';

const ETH = () => {
  const navigation = useNavigation();
  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'ETH List'}
            onPress={() => navigation.goBack()}
          />
        </>
      }
    />
  );
}

export default ETH

const styles = StyleSheet.create({})