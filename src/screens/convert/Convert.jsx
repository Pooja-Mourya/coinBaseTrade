import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenHeader from '../../common/ScreenHeader'
import Container from '../../common/Container'
import { useNavigation } from '@react-navigation/native'

const Convert = () => {
    const navigation = useNavigation()
  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'Convert'}
            onPress={() => navigation.goBack()}
          />
       
        </>
      }
    />
  )
}

export default Convert

const styles = StyleSheet.create({})