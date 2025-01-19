import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../common/Container';
import AppHeader from '../common/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import apiService from '../redux/apiService';
import {NotificationCount} from '../redux/AuthSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const Notification = () => {
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);
  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState();
  const fetchNotification = async () => {
    try {
      const res = await apiService({
        endpoint: `/notification/getById/${profileData?.user?._id}`,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      dispatch(NotificationCount(res.notifications.length));
      setNotificationData(res.notifications);
    } catch (error) {
      console.log('notification error : ', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    fetchNotification();
  }, [token]);

  // const handleDelete1 = async id => {
  //   try {
  //     const res = await apiService({
  //       endpoint: `/notification/deleteById/${id}`,
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     fetchNotification();
  //     setNotificationData(prevData =>
  //       prevData.filter(notification => notification._id !== id),
  //     );
  //     dispatch(NotificationCount(notificationData.length - 1));

  //     console.log('delete notification : ', res);
  //   } catch (error) {
  //     console.log('delete notification delete :', error);
  //   }
  // };

  const handleDelete = async id => {
    try {
      const res = await axios.delete(
        `https://coinbt.in/api/v1/notification/deleteById/${id}`,
        {
          headers: {
            Authorization: token, // Ensure token is defined
          },
        },
      );

      // Show success toast
      ToastAndroid.show(
        'Notification deleted successfully!',
        ToastAndroid.SHORT, // Toast duration
      );

      // Optionally update the UI or state here

      fetchNotification();
      setNotificationData(prevData =>
        prevData.filter(notification => notification._id !== id),
      );
      dispatch(NotificationCount(notificationData.length - 1));
    } catch (error) {
      // Show error toast
      const errorMessage =
        error.response?.data?.message || 'Failed to delete notification.';
      ToastAndroid.show(
        errorMessage,
        ToastAndroid.LONG, // Toast duration for error messages
      );

      console.error('Error deleting notification:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="notifications" size={24} color="#4caf50" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <MaterialIcons name="delete" size={24} color="tomato" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <AppHeader username={'Notification'} />
      {notificationData && notificationData.length > 0 ? (
        <FlatList
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Notifications Available</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
