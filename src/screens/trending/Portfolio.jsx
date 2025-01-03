import { Dimensions, FlatList, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../common/Container';
import ScreenHeader from '../../common/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import apiService from '../../redux/apiService';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Portfolio = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userData);
  const profileData = useSelector((state) => state.auth.profileData);

  const [portfolioData, setPortfolioData] = useState([]);
  const [currentPrice, setCurrentPrices] = useState({});
  const [usdToInrRate, setUsdToInrRate] = useState(1);

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
          ToastAndroid.SHORT
        );
      } catch (error) {
        ToastAndroid.show('Failed to fetch portfolio data.', ToastAndroid.SHORT);
      }
    };

    fetchPortfolioData();
  }, [token]);

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
        'https://v6.exchangerate-api.com/v6/21a681b52a1340599f0a1376/latest/USD'
      );
      setUsdToInrRate(exchangeRateResponse.data.conversion_rates.INR);
    } catch (error) {
      ToastAndroid.show('Failed to fetch live prices.', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchLivePrices();
  }, []);

  const calculateFields = (item) => {
    const priceInINR = currentPrice[item.code] * usdToInrRate || 0;
    const buyPrice = item.totalAmountInINR;
    const profitPerUnit = priceInINR - (buyPrice / item.quantity);
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

  const renderItem = ({ item }) => {
    const { priceInINR, buyPrice, profitPerUnit, totalProfit, totalValue } =
      calculateFields(item);

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.coinName}>{item.coinName} ({item.code})</Text>
        <Text>Quantity: {item.quantity}</Text>
        {/* <Text>Price (INR per unit): ₹{priceInINR}</Text> */}
        <Text>Buy Price (INR): ₹{buyPrice}</Text>
        <Text>Current Price (INR): ₹{priceInINR}</Text>
        <Text style={[styles.profitLoss, profitPerUnit >= 0 ? styles.profit : styles.loss]}>
          (Profit/Loss) per Unit: ₹{profitPerUnit}
        </Text>
        <Text style={[styles.profitLoss, totalProfit >= 0 ? styles.profit : styles.loss]}>
          Total (Loss/Profit): ₹{totalProfit}
        </Text>
        <Text>Total Value (INR): ₹{totalValue}</Text>
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
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
});

export default Portfolio;
