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
import apiService from '../../../redux/apiService';
import {useSelector} from 'react-redux';

const { width, height } = Dimensions.get('window');
const BTC = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService({
          endpoint: '/crypto/getList?page=1&per_page=50',
          method: 'GET',
          header: {
            Authorization: token,
          },
        });
        setData(response);
        ToastAndroid.showWithGravity(
          'BTC Fetched Successfully.',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        setData(null);
        ToastAndroid.showWithGravity(
          'Failed to fetch BTC data.',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    };

    fetchData();
  }, [token]);
  const data1 = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 79970,
    market_cap: 1581105251795,
    market_cap_rank: 1,
    fully_diluted_valuation: 1678590430154,
    total_volume: 71078685997,
    high_24h: 79994,
    low_24h: 76023,
    price_change_24h: 3947.18,
    price_change_percentage_24h: 5.1921,
    market_cap_change_24h: 77340463360,
    market_cap_change_percentage_24h: 5.14312,
    circulating_supply: 19780412,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 79994,
    ath_change_percentage: -0.2966,
    ath_date: '2024-11-10T12:06:10.072Z',
    atl: 67.81,
    atl_change_percentage: 117519.01309,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-11-10T17:34:56.652Z',
  };

  const renderItem = ({item}) => {
    const {
      //   name,
      //   symbol,
      current_price,
      market_cap,
      market_cap_rank,
      high_24h,
      low_24h,
      price_change_percentage_24h,
      ath,
      ath_date,
    } = item;

    return (
      <View style={styles.card}>
        {/* <Text style={styles.title}>Name: {name}</Text>
        <Text style={styles.text}>Symbol: {symbol.toUpperCase()}</Text> */}
        <Text style={styles.text}>Current Price: ₹{current_price}</Text>
        <Text style={styles.text}>Market Cap: ₹{market_cap}</Text>
        <Text style={styles.text}>Market Cap Rank: {market_cap_rank}</Text>
        <Text style={styles.text}>24h High: ₹{high_24h}</Text>
        <Text style={styles.text}>24h Low: ₹{low_24h}</Text>
        <Text style={styles.text}>
          24h Change: {price_change_percentage_24h.toFixed(2)}%
        </Text>
        <Text style={styles.text}>All-Time High: ₹{ath}</Text>
        <Text style={styles.text}>
          All-Time High Date: {new Date(ath_date).toLocaleString()}
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
            screenHeader={'BTC'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={data1}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </>
      }
    />
  );
};

export default BTC;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: width*0.9,
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
