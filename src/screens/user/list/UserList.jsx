import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {baseUrl} from '../../../redux/apiService';
import {useSelector} from 'react-redux';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const UserList = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData) {
          console.log('No token found!');
          return;
        }
        const response = await axios.get(`${baseUrl}/admin/userList`, {
          headers: {
            Authorization: userData,
          },
        });
        // console.log('Response Data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Response Error:', error.response.data);
        }
      }
    };
    fetchData();
  }, [userData]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        {/* <Image source={{uri: item.profileImg}} style={styles.profileImg} /> */}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>Profession: {item.profession}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        <Text style={styles.text}>Mobile: {item.mobile}</Text>
        <Text style={styles.text}>State: {item.state}</Text>
        <Text style={styles.text}>City: {item.city}</Text>

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
            screenHeader={'User List'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No Users Available</Text>
            }
          />
        </>
      }
    />
  );
};

export default UserList;

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
    alignItems: 'center',
    width: width*0.9,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
