import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from './AppColors';
import Global from '../screens/trending/Global/Global';

const {width} = Dimensions.get('window');
const TabHeader = () => {
  const data = ['Global', 'Crypto', 'Reksadana', 'CFD'];
  const [activeTab, setActiveTab] = useState('Global');
  const getContentForTab = tab => {
    switch (tab) {
      case 'Global':
        return (
            <Global />
        );
      case 'Crypto':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.contentHeader}>Crypto List</Text>
            <Text style={styles.contentText}>
              Cryptocurrency news, updates, and market trends. Information on
              Bitcoin, Ethereum, and other digital assets.
            </Text>
          </View>
        );
      case 'Reksadana':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.contentHeader}>Reksadana List</Text>
            <Text style={styles.contentText}>
              Information about Reksadana, mutual funds, and investment
              strategies in various markets.
            </Text>
          </View>
        );
      case 'CFD':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.contentHeader}>CFD List</Text>
            <Text style={styles.contentText}>
              Contracts for Difference (CFD) trading details, strategies, and
              market insights.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        {data.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => setActiveTab(item)}
              style={[styles.tab, activeTab === item && styles.activeTab]}>
              <Text
                style={[
                  styles.tabText,
                  {color: activeTab === item ? Colors.button : '#fff'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {getContentForTab(activeTab)}
      </ScrollView>
    </>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.button,
  },
  tabText: {
    fontSize: 16,
    color: '#fff',
  },
  contentContainer: {
    padding: 10,
  },
  contentSection: {
    marginBottom: 20,
  },
  contentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  contentText: {
    fontSize: 16,
    color: '#fff',
  },
});
