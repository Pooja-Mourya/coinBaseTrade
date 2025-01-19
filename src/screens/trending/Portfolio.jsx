import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../common/Container';
import ScreenHeader from '../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import apiService from '../../redux/apiService';
import {useSelector} from 'react-redux';
import axios from 'axios';

const {width} = Dimensions.get('window');

const Portfolio = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);

  const [portfolioData, setPortfolioData] = useState([]);
  const [currentPrice, setCurrentPrices] = useState({});
  const [usdToInrRate, setUsdToInrRate] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await apiService({
          endpoint: `/coin/user-portfolio/${profileData?.user._id}`,
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        setPortfolioData(res.transactions);
        ToastAndroid.show(
          'Successfully fetched portfolio data',
          ToastAndroid.SHORT,
        );
      } catch (error) {
        ToastAndroid.show(
          'Failed to fetch portfolio data.',
          ToastAndroid.SHORT,
        );
      }
    };

    fetchPortfolioData();
  }, []);

  const fetchLivePrices = async () => {
    try {
      const coinResponse = await apiService({
        endpoint: `/crypto/getLivePrice`,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      const livePrices = coinResponse.reduce((acc, price) => {
        acc[price.coinCode] = price.priceInUSD;
        return acc;
      }, {});

      setCurrentPrices(livePrices);

      const exchangeRateResponse = await axios.get(
        'https://v6.exchangerate-api.com/v6/21a681b52a1340599f0a1376/latest/USD',
      );
      setUsdToInrRate(exchangeRateResponse.data.conversion_rates.INR);
    } catch (error) {
      ToastAndroid.show('Failed to fetch live prices.', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchLivePrices();
  }, []);

  const calculateFields = item => {
    const priceInINR = currentPrice[item.code] * usdToInrRate || 0;
    const buyPrice = item.totalAmountInINR;
    const profitPerUnit = priceInINR - buyPrice / item.quantity;
    const totalProfit = profitPerUnit * item.quantity;
    const totalValue = priceInINR * item.quantity;

    return {
      priceInINR: priceInINR.toFixed(2),
      buyPrice: buyPrice.toFixed(2),
      profitPerUnit: profitPerUnit.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      totalValue: totalValue.toFixed(2),
    };
  };
  const handleSell = async transaction => {
    setLoading(false);
    try {
      // Ensure currentPrice exists for the coin
      if (!currentPrice[transaction.code]) {
        ToastAndroid.show(
          `Current price for ${transaction.coinName} is unavailable.`,
          ToastAndroid.SHORT,
        );
        return;
      }

      const priceInINR = currentPrice[transaction.code];
      const totalAmountInINR = priceInINR * transaction.quantity;

      const payload = {
        userId: profileData.user._id,
        coinName: transaction.coinName,
        code: transaction.code,
        quantity: transaction.quantity,
        priceInINR,
        totalAmountInINR,
      };

      const response = await axios.post(
        `https://www.coinbt.in/api/v1/coin/sell-coin/${transaction._id}`,
        payload,
        {
          headers: {Authorization: token},
        },
      );
      setLoading(false);
      if (response.data.success) {
        ToastAndroid.show(response.data.message, ToastAndroid.LONG);
        fetchPortfolioData();
      } else {
        ToastAndroid.show(
          response.data.message || 'Failed to sell coin.',
          ToastAndroid.LONG,
        );
      }
      if (response.status === 500 && response.data?.success) {
        ToastAndroid.show(
          'Coin sold successfully, but an error occurred.',
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      console.error('Sell Error:', error);
      ToastAndroid.show('Coin sold successfully, but an error occurred.',
        ToastAndroid.LONG,
      );
      setLoading(true);
    }
  };
  <ActivityIndicator size="large" color="#0000ff" />;
  const renderItem = ({item}) => {
    const {priceInINR, buyPrice, profitPerUnit, totalProfit, totalValue} =
      calculateFields(item);

    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.coinName}>
            {item.coinName} ({item.code})
          </Text>

          <Button
            variant="outline-danger"
            onPress={() => handleSell(item)}
            disabled={item.quantity === 0}
            title="Sell"
          />
        </View>

        <Text style={styles.textStyle}>Quantity: {item.quantity}</Text>
        {/* <Text style={styles.textStyle}>Price (INR per unit): ₹{priceInINR}</Text> */}

        <Text style={styles.textStyle}>
          Average Price : ₹{buyPrice / item.quantity}
        </Text>
        <Text style={styles.textStyle}>Invest : ₹{buyPrice}</Text>
        <Text style={styles.textStyle}>Current Price : ₹{priceInINR}</Text>
        {/* <Text
          style={[
            styles.profitLoss,
            profitPerUnit >= 0 ? styles.profit : styles.loss,
          ]}>
          (Profit/Loss) per Unit: ₹{profitPerUnit}
        </Text> */}
        <Text
          style={[
            styles.profitLoss,
            totalProfit >= 0 ? styles.profit : styles.loss,
          ]}>
          Current Value: ₹{totalValue}
        </Text>
        <Text
          style={[
            styles.profitLoss,
            totalProfit >= 0 ? styles.profit : styles.loss,
          ]}>
          Profit/Loss: ₹{totalProfit}
        </Text>
      </View>
    );
  };

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'Portfolio List'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={portfolioData}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          />
        </>
      }
    />
  );
};
export default Portfolio;
const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.9,
  },
  coinName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  profitLoss: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  profit: {
    color: 'green',
  },
  loss: {
    color: 'red',
  },
  textStyle: {
    color: '#000',
  },
});
