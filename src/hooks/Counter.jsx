import {Alert, Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../common/Container';
import Heading from '../common/Heading';

const Counter = () => {
  const initialValue = 0;
  const [count, setCount] = useState(initialValue);

  const increaseFive = () => {
    for (let index = 0; index < 5; index++) {
      setCount(re => re + 1);
    }
  };

  return (
    <Container
      backgroundColor={'#f34fd344'}
      content={
        <>
          <Heading heading={'Counter Application'} />
          <Text></Text>
          <Button
            title="Reset"
            onPress={() => {
              setCount(initialValue);
            }}
          />
          <Text></Text>
          <Button
            title=" + "
            onPress={() => {
              setCount(count + 1);
            }}
          />
          <Text></Text>
          <Text>{count}</Text>
          <Text></Text>
          <Button
            title=" - "
            onPress={() => {
              count > 0 && setCount(count - 1);
            }}
          />
          <Text></Text>
          <Button title="Increase 5" onPress={increaseFive} />
        </>
      }></Container>
  );
};

export default Counter;

const styles = StyleSheet.create({});
