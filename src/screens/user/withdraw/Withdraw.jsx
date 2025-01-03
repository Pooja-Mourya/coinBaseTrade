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
import ScreenHeader from '../../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import apiService from '../../../redux/apiService';

const { width, height } = Dimensions.get('window');
const Withdraw = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await apiService({
          endpoint: '/withdraw/allRequest',
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        // console.log('User withdrawals:', response.withdrawals);
        setData();
        ToastAndroid.showWithGravity(
          `withdrawals Fetched Successfully.`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        console.error('Error fetching user withdrawals:', error);
        ToastAndroid.showWithGravity(
          'Failed to Fetch Withdrawals: ' + (error.message || 'Unknown error'),
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    };

    fetchData();
  }, [token]);

  const renderItem = ({item}) => {
    const {userId, amount, status, requestDate, approvalDate} = item;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>User: {userId.name}</Text>
        <Text style={styles.text}>Email: {userId.email}</Text>
        <Text style={styles.text}>Amount: ₹{amount}</Text>
        <Text style={styles.text}>Status: {status}</Text>
        <Text style={styles.text}>
          Request Date: {new Date(requestDate).toLocaleString()}
        </Text>

        {status === 'approved' && approvalDate && (
          <Text style={styles.text}>
            Approval Date: {new Date(approvalDate).toLocaleString()}
          </Text>
        )}

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
            screenHeader={'Withdraw'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No Withdrawals Available</Text>
            }
          />
        </>
      }
    />
  );
};

export default Withdraw;

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
