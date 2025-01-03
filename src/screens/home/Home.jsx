import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../common/AppHeader';
import SpaceBetween from '../../common/SpaceBetween';
import {Colors} from '../../common/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import CommonInput from '../../common/CommonInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoaderView from '../../common/LoaderView';
import apiService from '../../redux/apiService';
import CommonModal from '../../common/CommonModal';
import CommonButton from '../../common/CommonButton';
import {useWallet} from '../../hooks/WalletProvider';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const width = Dimensions.get('screen').width;
const Dashboard = () => {
  const {walletData} = useWallet();

  const token = useSelector(state => state.auth.authorization);
  const userId = useSelector(state => state.auth.profileData);
  const [search, setSearch] = useState('');
  const [buyCoin, setBuyCoin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icons, setIcons] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [perPage, setPerPage] = useState(50);
  const [itemStore, setItemStore] = useState();
  const [totalInrAmount, setTotalInrAmount] = useState(0);

  const reducer = (state, action) => {
    switch (action) {
      case 'Increase':
        return state + 1;
      case 'Decrement':
        return state > 1 && state - 1;
      default:
        return state;
    }
  };
  const [counter, setCounter] = useReducer(reducer, 1);
  const [inrRate, setInrRate] = useState(null);

  const handleCoin = async (pageNum = 1, isRefresh = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await apiService({
        endpoint: `/crypto/getList?page=${pageNum}&per_page=${perPage}`,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      if (res.length === 0 || res.length < perPage) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (isRefresh) {
        setIcons(res); // Replace the icons list on refresh
      } else {
        setIcons(prevIcons => [...prevIcons, ...res]); // Append new data to existing list
      }

      setPage(pageNum); // Update the current page
    } catch (error) {
      console.log('Error fetching coins: ', error);
    } finally {
      setLoading(false);
      if (isRefresh) setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setHasMore(true);
    handleCoin(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPerPage(prev => prev + 50);
      handleCoin(page + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  useEffect(() => {
    handleCoin();
    const intervalId = setInterval(() => {
      handleRefresh();
    }, 50000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          'https://v6.exchangerate-api.com/v6/21a681b52a1340599f0a1376/latest/USD',
        );
        const rate = response.data.conversion_rates.INR;
        setInrRate(rate);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the exchange rate:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch the exchange rate. Using default rate.',
        });
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (itemStore && inrRate) {
      const amountInInr = (itemStore.current_price * counter * inrRate).toFixed(
        2,
      );
      setTotalInrAmount(amountInInr);
    }
  }, [counter, itemStore, inrRate]);

  const handleBuyKnow = async () => {
    Alert.alert(
      'Confirm Purchase',
      `Are you sure you want to buy ${counter} ${itemStore.name} for ₹${totalInrAmount}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const transactionData = {
                userId: userId.user._id,
                coinName: itemStore.name,
                code: itemStore.symbol.toUpperCase(),
                quantity: counter,
                priceInUSD: itemStore.current_price.toFixed(2),
                totalAmountInINR: (
                  itemStore.current_price *
                  counter *
                  inrRate
                ).toFixed(2),
              };

              const response = await axios.post(
                'https://www.coinbt.in/api/v1/coin/buy-coin',
                transactionData,
              );

              if (response.status === 201) {
                Toast.show({
                  type: 'success',
                  text1: 'Success',
                  text2: response.data.message,
                });
                setBuyCoin(false);
              }
            } catch (error) {
              console.error('Error creating transaction:', error);
              Alert.alert(
                'You can not Buy The Coin',
                `Insufficient Balance,  ₹${totalInrAmount}`,
              );
              setBuyCoin(false);
            }
          },
        },
      ],
    );
  };
  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <AppHeader />
      <LinearGradient
        colors={[Colors.card1, Colors.card2]}
        style={styles.balanceContainer}>
        <SpaceBetween
          children={
            <>
              <View>
                <Text style={styles.balanceText}>Balance</Text>
                <Text style={styles.amount}>
                  {` Rs : ${
                    walletData?.balance.toFixed(2)
                      ? walletData?.balance.toFixed(2)
                      : '0'
                  }`}
                </Text>
                {/* <Text style={styles.change}>↑ Rs 206,920 (10.6%)</Text> */}
              </View>
              <View>
                <Text style={{marginTop: 10}}>
                  <Ionicons name={'wallet-outline'} size={60} color={'#fff'} />
                </Text>
              </View>
            </>
          }
        />
      </LinearGradient>
      {loading ? (
        <LoaderView />
      ) : (
        <View
          style={{
            width: width / 1.04,
            backgroundColor: Colors.container2,
            marginHorizontal: 8,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // marginBottom: 300,
          }}>
          <KeyboardAwareScrollView>
            <CommonInput
              value={search}
              onChangeText={e => setSearch(e)}
              placeholder={'Search coin by name'}
              rightIcon={'search'}
              inputStyle={{paddingVertical: 5}}
            />
          </KeyboardAwareScrollView>
          <SpaceBetween
            spaceBetweenStyle={{
              backgroundColor: Colors.card1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}
            children={
              <>
                <View>
                  <Text style={styles.textStyle}>Market Statistics</Text>
                </View>
                <View>
                  {/* <Text style={styles.textBorderStyle}>
                    All <AntDesign name={'right'} color={'#fff'} size={18} />
                  </Text> */}
                </View>
              </>
            }
          />
          <FlatList
            data={icons.filter(se =>
              se.name.toLowerCase().includes(search.toLowerCase()),
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? Colors.container2 : Colors.card2,
                  // marginVertical: 5, // Add spacing between items
                  // padding: 10, // Add padding for better appearance
                  borderRadius: 10, // Optional: Add rounded corners
                }}>
                <SpaceBetween
                  spaceBetweenStyle={{paddingVertical: 20}}
                  children={
                    <>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={{uri: item.image}}
                          style={{width: 25, height: 25, marginRight: 10}}
                        />
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              width: '100%',
                            }}>{`${item.name} (${item.symbol})`}</Text>
                          <Text
                            style={{
                              color: '#e37373',
                              width: '100%',
                            }}>{`24h(INR) ${item.price_change_percentage_24h_in_currency_inr.toFixed(
                            2,
                          )}`}</Text>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            width: '100%',
                          }}>
                          USD
                        </Text>
                        <Text
                          style={{
                            // color: index % 2 === 0 ? 'red' : 'green',
                            color: 'orange',
                            textAlign: 'center',
                            width: '100%',
                          }}>
                          $ {item.current_price}
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: '#fff', textAlign: 'right'}}>
                          {/* {item.price_change_24h.toFixed(2)} */}
                          INR
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            textAlign: 'right',
                          }}>
                          ₹ {item.current_price_inr.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setItemStore(item);
                          setBuyCoin(true);
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            backgroundColor: 'green',
                            paddingHorizontal: 15,
                            borderRadius: 10,
                            paddingVertical: 5,
                            textAlign: 'center',
                          }}>
                          Buy
                        </Text>
                      </TouchableOpacity>
                    </>
                  }
                />
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
      {buyCoin && (
        <CommonModal
          visible={buyCoin}
          onClose={() => setBuyCoin(false)}
          // modalTitle="e"
          modalContent={
            <>
              <View>
                <Image
                  source={{uri: itemStore.image}}
                  style={{width: 25, height: 25, margin: 10}}
                />
                <Text style={{color: '#fff'}}>
                  Coin Name : {itemStore.name}
                </Text>
                <Text style={{color: '#fff'}}>Code : {itemStore.symbol}</Text>
                <Text style={{color: '#fff'}}>
                  Price : {itemStore.current_price}
                </Text>
                <Text style={{color: '#fff'}}>
                  Total Price : {itemStore.current_price * counter.toFixed(2)}
                </Text>
              </View>
              <SpaceBetween
                children={
                  <>
                    <CommonButton
                      title={' + '}
                      onPress={() => setCounter('Increase')}
                    />
                    <CommonButton
                      title={counter > 1 ? counter : 1}
                      backgroundColor={'teal'}
                      textColor={'#ffff'}
                    />
                    <CommonButton
                      title={' - '}
                      onPress={() => setCounter('Decrement')}
                    />
                  </>
                }
              />
              <CommonButton title={'Buy Now'} onPress={handleBuyKnow} />
            </>
          }
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburgerMenu: {
    fontSize: 24,
    color: 'white',
  },
  balanceContainer: {
    backgroundColor: '#2B3A67',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  balanceText: {
    color: '#A0AEC0',
    fontSize: 16,
  },
  amount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  change: {
    color: '#00C853',
    fontSize: 14,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  depositButton: {
    backgroundColor: '#FBC02D',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#FBC02D',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#1A202C',
    fontWeight: 'bold',
  },
  trendingStockContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stockList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockItem: {
    backgroundColor: '#2B3A67',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  stockSymbol: {
    color: '#A0AEC0',
    fontSize: 14,
    marginBottom: 5,
  },
  stockPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  marketStatsContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  marketItem: {
    backgroundColor: '#2B3A67',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  marketPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  marketChange: {
    color: '#00C853',
    fontSize: 14,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  textBorderStyle: {
    color: '#fff',
    fontSize: 18,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 2,
  },
});

export default Dashboard;
