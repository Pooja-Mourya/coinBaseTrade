import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {UserData} from '../redux/AuthSlice';
import { Colors } from '../common/AppColors';

const CustomDrawerNavigation = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileData = useSelector(state => state.auth.profileData);
  const handleLogout = () => {
    try {
      dispatch(UserData(''));
      navigation.navigate('Splash');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/img/logo.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profileData?.user?.name}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.drawerButton} onPress={handleLogout}>
        <Text style={styles.drawerButtonText}>Logout</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerButton: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#e6e6e6',
    marginVertical: 10,
    borderRadius: 5,
  },
  drawerButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color:Colors.card1
  },
});

export default CustomDrawerNavigation;
