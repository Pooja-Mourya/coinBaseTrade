import {StyleSheet, View} from 'react-native';
import React from 'react';

const SpaceBetween = ({children, spaceBetweenStyle}) => {
  return <View style={[styles.spaceView, spaceBetweenStyle]}>{children}</View>;
};

export default SpaceBetween;

const styles = StyleSheet.create({
  spaceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
});
