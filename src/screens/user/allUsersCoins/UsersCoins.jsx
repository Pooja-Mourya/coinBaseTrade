import {Dimensions, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../common/ScreenHeader';
import Container from '../../../common/Container';
import {useSelector} from 'react-redux';
import apiService from '../../../redux/apiService';

const { width, height } = Dimensions.get('window');
const UsersCoins = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.userData);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService({
          endpoint: '/coin/allBuyRequestList',
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        // console.log('User Coins:', response.transactions);
        setData();
        ToastAndroid.showWithGravity(
          `complains Fetched Successfully.`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        console.error('Error fetching user complains:', error);
        ToastAndroid.showWithGravity(
          'Failed to Fetch Complains: ' + (error.message || 'Unknown error'),
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    };

    fetchData();
  }, [token]);

  const renderItem = ({item}) => {
    const {
      coinName,
      code,
      quantity,
      priceInUSD,
      totalAmountInINR,
      status,
      type,
      sold,
      date,
    } = item;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {coinName} ({code})
        </Text>
        <Text style={styles.text}>Quantity: {quantity}</Text>
        <Text style={styles.text}>Price per coin (USD): ${priceInUSD}</Text>
        <Text style={styles.text}>Total Amount (INR): ₹{totalAmountInINR}</Text>
        <Text style={styles.text}>Status: {status}</Text>
        <Text style={styles.text}>Type: {type}</Text>
        <Text style={styles.text}>Sold: {sold ? 'Yes' : 'No'}</Text>
        <Text style={styles.text}>Date: {new Date(date).toLocaleString()}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'All User Coins'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No Transactions Available</Text>
            }
          />
        </>
      }
    />
  );
};

export default UsersCoins;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: width*0.9
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
