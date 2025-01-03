import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../common/Container';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../common/ScreenHeader';
import apiService from '../../../redux/apiService';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');
const Funds = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.userData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService({
          endpoint: '/razorpay/users-fund',
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        // console.log('User funds:', response.orders);
        setData();
        ToastAndroid.showWithGravity(
          `Funds Fetched Successfully. Balance: ₹${response.balance}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        console.error('Error fetching user funds:', error);
        ToastAndroid.showWithGravity(
          'Failed to Fetch Funds: ' + (error.message || 'Unknown error'),
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    };

    fetchData();
  }, [token]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        {/* <Text style={styles.orderTitle}>Order ID: {item.razorpayOrderId}</Text> */}
        <Text style={styles.text}>Amount: ₹{item.amount}</Text>
        <Text style={styles.text}>User: {item.userName}</Text>
        <Text style={styles.text}>Payment Status: {item.paymentStatus}</Text>
        <Text style={styles.text}>
          Created At: {new Date(item.createdAt).toLocaleString()}
        </Text>

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
            screenHeader={'Funds'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No Orders Available</Text>
            }
          />
        </>
      }
    />
  );
};

export default Funds;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 20,
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
    width: width * 0.9,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
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
