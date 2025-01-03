import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const CustomTabNavigation = ({navigation}) => {
  const roleWise = useSelector(state => state.auth.IsAdmin);
  const count = useSelector(state => state.auth.notificationCount)
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Home' ? styles.activeTabBorder : null,
        ]}
        onPress={() => {
          setActiveTab('Home');
          navigation.navigate('Home');
        }}>
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === 'Home' ? '#FFD700' : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Home' && styles.activeTabText,
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Trending' ? styles.activeTabBorder : null,
        ]}
        onPress={() => {
          setActiveTab('Trending');
          navigation.navigate('Trending');
        }}>
        <MaterialCommunityIcons
          name="fire"
          size={24}
          color={activeTab === 'Trending' ? '#FFD700' : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Trending' && styles.activeTabText,
          ]}>
          Trending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Option' ? styles.activeTabBorder : null,
        ]}
        onPress={() => {
          setActiveTab('Option');
          navigation.navigate('Option');
        }}>
        <Entypo
          name="plus"
          size={25}
          color={activeTab === 'Option' ? '#FFD700' : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Option' && styles.activeTabText,
          ]}>
          Option
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Finance' ? styles.activeTabBorder : null,
        ]}
        onPress={() => {
          setActiveTab('Finance');
          navigation.navigate('Finance');
        }}>
        <MaterialIcons
          name="show-chart"
          size={24}
          color={activeTab === 'Finance' ? '#FFD700' : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Finance' && styles.activeTabText,
          ]}>
          Finance
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'Notification' ? styles.activeTabBorder : null,
          {position: 'relative'},
        ]}
        onPress={() => {
          setActiveTab('Notification');
          navigation.navigate('Notification');
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: count > 0 ? 'red' : 'transparent',
            borderRadius: 50,
            minWidth: 18,
            minHeight: 18,
            top: -8,
          }}>
          <Text style={{color: '#fff', textAlign: 'center', padding: 2}}>
            {count>0 && count}
          </Text>
        </View>
        <MaterialIcons
          name="notifications"
          size={24}
          color={activeTab === 'Notification' ? '#FFD700' : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Notification' && styles.activeTabText,
          ]}>
          Notification
        </Text>
      </TouchableOpacity>
      {roleWise === 1 && (
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'User' ? styles.activeTabBorder : null,
          ]}
          onPress={() => {
            setActiveTab('User');
            navigation.navigate('User');
          }}>
          <MaterialIcons
            name="person"
            size={24}
            color={activeTab === 'User' ? '#FFD700' : '#A0AEC0'}
            style={{marginTop: 10}}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'User' && styles.activeTabText,
            ]}>
            User
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTabNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#141E30',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 4,
    paddingBottom: 10,
  },
  activeTabText: {
    color: '#FFD700',
  },
  activeTabBorder: {
    borderTopWidth: 3,
    borderColor: '#FFD700',
  },
});
