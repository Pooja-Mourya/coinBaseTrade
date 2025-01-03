import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SpaceBetween from './SpaceBetween';
import {Colors} from './AppColors';

const Table = ({tableData, item0, item1, item2, item3, item4, item5, onPress}) => {
  const item = tableData.reduce((acc, item) => {
    acc[item.name] = item; // Use `name` or any other unique property as the key
    return acc;
  }, {});
  return (
    <View style={{height: '100%'}}>
    
        <View
          key={index}
          style={{
            backgroundColor: index % 2 === 0 ? Colors.container2 : Colors.card2,
          }}>
          <SpaceBetween
            spaceBetweenStyle={{paddingVertical: 20}}
            children={
              <>
                <View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image
                      source={{uri: item[item0]}}
                      style={{width: 25, height: 25, margin: 10}}
                    />
                    <View>
                      <Text style={{color: '#fff'}}>{item[item1]}</Text>
                      <Text style={{color: '#eee'}}>{item[item2]}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Current Price
                  </Text>
                  <Text
                    style={{
                      color: index % 2 === 0 ? 'red' : 'green',
                      textAlign: 'center',
                    }}>
                    {item[item3]}
                  </Text>
                </View>
                <View>
                  <Text style={{color: '#fff', textAlign: 'right'}}>
                    {item[item4].toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      color: index % 2 === 0 ? 'red' : 'green',
                      textAlign: 'right',
                    }}>
                    {item[item5].toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity onPress={onPress}>
                  <Text
                    style={{
                      color: '#fff',
                      backgroundColor: 'green',
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      paddingVertical: 5,
                    }}>
                    Buy
                  </Text>
                </TouchableOpacity>
              </>
            }
          />
        </View>
      
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({});
