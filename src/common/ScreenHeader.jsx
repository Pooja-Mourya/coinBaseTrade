import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SpaceBetween from './SpaceBetween';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ScreenHeader = ({onPress, screenHeader}) => {
  return (
    <View style={{borderBottomWidth: 1, paddingBottom: 10}}>
      <SpaceBetween
        children={
          <>
            <TouchableOpacity onPress={onPress}>
              <FontAwesome6 name={'arrow-left-long'} size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
              {screenHeader}
            </Text>
          </>
        }
      />
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({});
