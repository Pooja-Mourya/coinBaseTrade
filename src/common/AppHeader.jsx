import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Colors} from './AppColors';
import {useSelector} from 'react-redux';

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

const AppHeader = () => {
  const navigation = useNavigation();
  const greetingMessage = getGreeting();
  const profileData = useSelector(state => state.auth.profileData);

  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: profileData?.user?.profileImg
              ? `https://www.coinbt.in/api/uploads/${profileData?.user?.profileImg}`
              : 'https://via.placeholder.com/150/CCCCCC/000000?text=No+Image',
          }}
          resizeMode="contain"
          style={styles.profileImage}
        />

        <View style={styles.greetingContainer}>
          {/* <Text style={styles.greetingText}>{greetingMessage}</Text> */}
          <Text style={styles.userName}>{profileData?.user?.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Text style={styles.hamburgerMenu}>☰</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#141E30',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee',
    // backgroundColor: 'teal',
  },
  greetingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginTop: 6,
  },
  greetingText: {
    color: Colors.button,
    fontSize: 12,
  },
  userName: {
    color: '#A0AEC0',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 6,
  },
  hamburgerMenu: {
    fontSize: 30,
    color: 'white',
  },
});
