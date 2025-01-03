// import {
//   Alert,
//   Dimensions,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import Container from '../../common/Container';
// import ScreenHeader from '../../common/ScreenHeader';
// import apiService from '../../redux/apiService';
// import {useSelector} from 'react-redux';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import CommonButton from '../../common/CommonButton';

// const {width, height} = Dimensions.get('window');
// const BuyCoin = () => {
//   const navigation = useNavigation();
//   const token = useSelector(state => state.auth.userData);
//   const profileData = useSelector(state => state.auth.profileData);
//   const [buyCoin, setBuyCoin] = useState();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await apiService({
//           endpoint: `/coin/userBuyList/${profileData?.user._id}`,
//           method: 'GET',
//           headers: {
//             Authorization: token,
//           },
//         });
//         setBuyCoin(res.transactions);
//       } catch (error) {
//         console.log('error : ', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSellCoin = async item => {
//     console.log('sell item ', item);
//     const data = {
//       userId: profileData?.user._id,
//       coinName: item.coinName,
//       code: item.code,
//       quantity: item.quantity,
//       priceInUSD: item.priceInUSD,
//       totalAmountInINR: item.totalAmountInINR,
//     };
//     try {
//       await apiService({
//         endpoint: `/coin/sell-coin/${item._id}`,
//         method: 'POST',
//         data,
//         headers: {
//           Authorization: token,
//         },
//       });
//       fetchData();
//     } catch (error) {
//       console.log('error : ', error);
//       Alert.alert('Coin Sold Status ', error.message);
//     }
//   };
//   const renderItem = ({item, index}) => (
//     <View style={styles.card} key={index}>
//       <View style={styles.header}>
//         <Text style={styles.coinName}>
//           {item.coinName} ({item.code})
//         </Text>
//         {item.status === 'approved' ? (
//           <CommonButton title={'Sell'} onPress={() => handleSellCoin(item)} />
//         ) : (
//           <FontAwesome
//             name={item.type === 'buy' ? 'arrow-up' : 'arrow-down'}
//             size={20}
//             color={item.type === 'buy' ? 'green' : 'red'}
//           />
//         )}
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.detailText}>
//           Quantity: <Text style={styles.valueText}>{item.quantity}</Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Price:{' '}
//           <Text style={styles.valueText}>${item.priceInUSD.toFixed(2)}</Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Total (INR):{' '}
//           <Text style={styles.valueText}>
//             ₹{item.totalAmountInINR.toFixed(2)}
//           </Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Status:{' '}
//           <Text
//             style={[
//               styles.valueText,
//               item.status === 'approved' ? styles.approved : styles.pending,
//             ]}>
//             {item.status}
//           </Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Sold: <Text style={styles.valueText}>{item.sold ? 'Yes' : 'No'}</Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Date:{' '}
//           <Text style={styles.valueText}>
//             {new Date(item.date).toLocaleDateString()}
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
//   return (
//     <Container
//       content={
//         <>
//           <ScreenHeader
//             screenHeader={'Buy Coin List'}
//             onPress={() => navigation.goBack()}
//           />
//           <FlatList
//             data={buyCoin}
//             keyExtractor={item => item._id}
//             renderItem={renderItem}
//             contentContainerStyle={styles.listContainer}
//           />
//         </>
//       }
//     />
//   );
// };

// export default BuyCoin;

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginVertical: 8,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//     width: width * 0.9,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   coinName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//   },
//   detailsContainer: {
//     marginTop: 5,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 5,
//   },
//   valueText: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   approved: {
//     color: 'green',
//   },
//   pending: {
//     color: 'orange',
//   },
// });

import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../common/Container';
import ScreenHeader from '../../common/ScreenHeader';
import apiService from '../../redux/apiService';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonButton from '../../common/CommonButton';

const {width, height} = Dimensions.get('window');
const BuyCoin = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);
  const [buyCoin, setBuyCoin] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await apiService({
        endpoint: `/coin/userBuyList/${profileData?.user._id}`,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      setBuyCoin(res.transactions);
    } catch (error) {
      console.log('error : ', error);
    }
  }, [profileData?.user._id, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleSellCoin = async item => {
    const data = {
      userId: profileData?.user._id,
      coinName: item.coinName,
      code: item.code,
      quantity: item.quantity,
      priceInUSD: item.priceInUSD,
      totalAmountInINR: item.totalAmountInINR,
    };
    try {
      await apiService({
        endpoint: `/coin/sell-coin/${item._id}`,
        method: 'POST',
        data,
        headers: {
          Authorization: token,
        },
      });
      fetchData();
    } catch (error) {
      console.log('error : ', error);
      Alert.alert('Coin Sold Status ', error.message);
    }
  };

  const getStatusStyle = status => {
    switch (status) {
      case 'approved':
        return styles.approved;
      case 'pending':
        return styles.pending;
      default:
        return {};
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.coinName}>
          {item.coinName} ({item.code})
        </Text>
        {item.status === 'approved' ? (
          <CommonButton
            title={item.sold ? 'Sold' : 'Sell'}
            onPress={() => {
              item.sold ? null : handleSellCoin(item);
            }}
            backgroundColor={item.sold && 'tomato'}
          />
        ) : (
          <FontAwesome
            name={item.type === 'buy' ? 'arrow-up' : 'arrow-down'}
            size={20}
            color={item.type === 'buy' ? 'green' : 'red'}
          />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          Quantity: <Text style={styles.valueText}>{item.quantity}</Text>
        </Text>
        <Text style={styles.detailText}>
          Price:{' '}
          <Text style={styles.valueText}>${item.priceInUSD.toFixed(2)}</Text>
        </Text>
        <Text style={styles.detailText}>
          Total (INR):{' '}
          <Text style={styles.valueText}>
            ₹{item.totalAmountInINR.toFixed(2)}
          </Text>
        </Text>
        <Text style={styles.detailText}>
          Status:{' '}
          <Text style={[styles.valueText, getStatusStyle(item.status)]}>
            {item.status}
          </Text>
        </Text>
        <Text style={styles.detailText}>
          Sold: <Text style={styles.valueText}>{item.sold ? 'Yes' : 'No'}</Text>
        </Text>
        <Text style={styles.detailText}>
          Date:{' '}
          <Text style={styles.valueText}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'Buy Coin List'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={buyCoin}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </>
      }
    />
  );
};

export default BuyCoin;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: width * 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  coinName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  detailsContainer: {
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  valueText: {
    fontWeight: '500',
    color: '#000',
  },
  approved: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
});
