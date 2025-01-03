import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const LoaderView = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const translateValue = useRef(new Animated.Value(0)).current; // Translation value

  const animate = () => {
    scaleValue.setValue(1); // Reset to initial scale
    translateValue.setValue(0); // Reset translation

    // Start the animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1.5, // Scale to 1.5 times its original size
        duration: 800, // Duration for the scale effect
        useNativeDriver: true,
      }),
      Animated.timing(translateValue, {
        toValue: -20, // Translate upwards
        duration: 800, // Duration for the translation effect
        useNativeDriver: true,
      }),
    ]).start(() => animate()); // Restart the animation
  };

  useEffect(() => {
    animate(); // Start the animation on component mount
  }, []);

  return (
    <Animated.View style={styles.container}>
      <Animated.Text // Use Animated.Text to enable animations on the text
        style={[
          styles.textStyle,
          {
            transform: [
              { scale: scaleValue }, // Scale transformation
              { translateX: translateValue }, // Translation transformation
            ],
          },
        ]}
      >
        Loading...
      </Animated.Text>
    </Animated.View>
  );
};

export default LoaderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 26,
    color: '#fff',
  },
});
