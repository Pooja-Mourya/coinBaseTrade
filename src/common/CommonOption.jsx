import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useRef, useEffect} from 'react';

const {width} = Dimensions.get('window');

const CommonOption = ({optionScreen, onPress}) => {
  const AnimatedOption = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(AnimatedOption, {
      toValue: 1,
      duration: 1000,
      friction: 2,
      tension: 100,
      useNativeDriver: true,
    }),
      {
        iterations: -1,
      };
    Animated.timing(AnimatedOption, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [AnimatedOption]);

  return (
    <Animated.View style={{opacity: AnimatedOption}}>
      <ScrollView contentContainerStyle={styles.optionContainer}>
        {optionScreen.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress && onPress(index)}
            style={styles.optionBox}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default CommonOption;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  optionContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
    gap: 30,
  },
  optionBox: {
    backgroundColor: '#1e3c72',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.9,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
