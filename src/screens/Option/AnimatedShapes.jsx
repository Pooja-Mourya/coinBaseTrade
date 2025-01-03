import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const AnimatedShapes = () => {
  const scaleTriangle = useRef(new Animated.Value(1)).current;
  const scaleRectangle = useRef(new Animated.Value(1)).current;
  const scaleCircle = useRef(new Animated.Value(1)).current;

  const animateTriangle = () => {
    scaleTriangle.setValue(1);
    Animated.timing(scaleTriangle, {
      toValue: 1.5,
      duration: 800,
      useNativeDriver: true,
    }).start(() => animateTriangle());
  };

  const animateRectangle = () => {
    scaleRectangle.setValue(1);
    Animated.timing(scaleRectangle, {
      toValue: 1.5,
      duration: 800,
      useNativeDriver: true,
    }).start(() => animateRectangle());
  };

  const animateCircle = () => {
    scaleCircle.setValue(1);
    Animated.timing(scaleCircle, {
      toValue: 1.5,
      duration: 800,
      useNativeDriver: true,
    }).start(() => animateCircle());
  };

  useEffect(() => {
    animateTriangle();
    animateRectangle();
    animateCircle();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.triangle, { transform: [{ scale: scaleTriangle }] }]} />
      <Animated.View style={[styles.rectangle, { transform: [{ scale: scaleRectangle }] }]} />
      <Animated.View style={[styles.circle, { transform: [{ scale: scaleCircle }] }]} />
    </View>
  );
};

export default AnimatedShapes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 100,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF6347', // Tomato color
    marginBottom: -60,
  },
  rectangle: {
    width: 100,
    height: 50,
    backgroundColor: '#4682B4', // Steel Blue color
    marginBottom: -30,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#32CD32', // Lime Green color
  },
});
