import {StyleSheet, Text, View} from 'react-native';
import React, {useReducer} from 'react';
import Heading from '../common/Heading';
import Container from '../common/Container';
import CommonButton from '../common/CommonButton';

const initialState = 0;

const reducer = (state, action) => {
  switch (action) {
    case 'Increase':
      return state + 1;
    case 'Decrement':
      return state - 1;
    case 'Reset':
      return initialState;
    default:
      return state;
  }
};

const CounterReducer = () => {
  const [counter, dispatch] = useReducer(reducer, initialState);

  return (
    <Container
      backgroundColor={'#3e3e'}
      content={
        <>
          <Heading heading={'Counter Reducer'} />
          <Text style={styles.counterText}>{counter}</Text>
          <CommonButton title={" + "} onPress={() => dispatch('Increase')} />
          <CommonButton title={" - "} onPress={() => dispatch('Decrement')} />
          <CommonButton title={"Reset"} onPress={() => dispatch('Reset')} />
        </>
      }
    />
  );
};

export default CounterReducer;

const styles = StyleSheet.create({
  counterText: {
    fontSize: 40,
    marginVertical: 20,
  },
});
