import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Heading = ({heading}) => {
  return (
    <View>
      <Text style={styles.heading}>{heading}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
