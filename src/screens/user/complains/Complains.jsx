import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import apiService from '../../../redux/apiService';

const Complains = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.userData);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService({
          endpoint: '/support/supportList',
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        // console.log('User Complains:', response);
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
    const {email, subject, message, date} = item;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Subject: {subject}</Text>
        <Text style={styles.text}>From: {email}</Text>
        <Text style={styles.text}>Message: {message}</Text>
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
            screenHeader={'Complains'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No Messages Available</Text>
            }
          />
        </>
      }
    />
  );
};

export default Complains;

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
