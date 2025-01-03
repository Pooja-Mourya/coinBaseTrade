// import {
//   Dimensions,
//   FlatList,
//   StyleSheet,
//   Text,
//   ToastAndroid,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Container from '../../common/Container';
// import {useNavigation} from '@react-navigation/native';
// import ScreenHeader from '../../common/ScreenHeader';
// import apiService from '../../redux/apiService';
// import {useSelector} from 'react-redux';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useWallet } from '../../hooks/WalletProvider';

// const {width, height} = Dimensions.get('window');
// const SellCoin = () => {
//   const navigation = useNavigation();
//   const token = useSelector(state => state.auth.userData);
//   const profileData = useSelector(state => state.auth.profileData);
//   // const { walletData } = useWallet();
//   // console.log("walletDat : ", walletData);
//   const [sellCoin, setSellCoin] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await apiService({
//           endpoint: `/coin/userApprovedCoinList/${profileData?.user._id}`,
//           method: 'GET',
//           headers: {
//             Authorization: token,
//           },
//         });
//         setSellCoin(res.transactions);
//         ToastAndroid.show('Fetch Sell Coin Success ful', ToastAndroid.SHORT);
//       } catch (error) {
//         // console.log('error : ', error);
//         if (error.status == 404) {
//           ToastAndroid.show(error.details?.message, ToastAndroid.SHORT);
//         }
//       }
//     };
//     fetchData();
//   }, [token]);

//   const renderItem = ({item}) => (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.coinName}>
//           {item.coinName} ({item.code})
//         </Text>
//         <FontAwesome
//           name={item.type === 'buy' ? 'arrow-up' : 'arrow-down'}
//           size={18}
//           color={item.type === 'buy' ? '#4caf50' : '#f44336'}
//         />
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.detailText}>
//           Quantity: <Text style={styles.valueText}>{item.quantity}</Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Price (USD):{' '}
//           <Text style={styles.valueText}>${item.priceInUSD.toFixed(2)}</Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Total (INR):{' '}
//           <Text style={styles.valueText}>
//             ₹{item.totalAmountInINR.toFixed(2)}
//           </Text>
//         </Text>
//         <Text style={styles.detailText}>
//           Status:
//           <Text
//             style={[
//               styles.valueText,
//               item.status === 'approved' ? styles.approved : styles.pending,
//             ]}>
//             {' '}
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
//             screenHeader={'Sell Coin List'}
//             onPress={() => navigation.goBack()}
//           />
//           <FlatList
//             data={sellCoin}
//             keyExtractor={item => item._id}
//             renderItem={renderItem}
//             contentContainerStyle={styles.listContainer}
//           />
//         </>
//       }
//     />
//   );
// };

// export default SellCoin;

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 16,
//     // backgroundColor: '#f5f5f5',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginVertical: 8,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     width: width * 0.9,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   coinName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   detailsContainer: {
//     marginTop: 5,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   valueText: {
//     fontWeight: '500',
//     color: '#333',
//   },
//   approved: {
//     color: '#4caf50',
//   },
//   pending: {
//     color: '#ffa726',
//   },
// });



import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../common/Container';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../common/ScreenHeader';
import apiService from '../../redux/apiService';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');
const SellCoin = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userData);
  const profileData = useSelector(state => state.auth.profileData);
  const [sellCoin, setSellCoin] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await apiService({
        endpoint: `/coin/userApprovedCoinList/${profileData?.user._id}`,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      setSellCoin(res.transactions);
      ToastAndroid.show('Fetch Sell Coin Successful', ToastAndroid.SHORT);
    } catch (error) {
      if (error.status === 404) {
        ToastAndroid.show(error.details?.message, ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.coinName}>
          {item.coinName} ({item.code})
        </Text>
        <FontAwesome
          name={item.type === 'buy' ? 'arrow-up' : 'arrow-down'}
          size={18}
          color={item.type === 'buy' ? '#4caf50' : '#f44336'}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          Quantity: <Text style={styles.valueText}>{item.quantity}</Text>
        </Text>
        <Text style={styles.detailText}>
          Price (USD):{' '}
          <Text style={styles.valueText}>${item.priceInUSD.toFixed(2)}</Text>
        </Text>
        <Text style={styles.detailText}>
          Total (INR):{' '}
          <Text style={styles.valueText}>
            ₹{item.totalAmountInINR.toFixed(2)}
          </Text>
        </Text>
        <Text style={styles.detailText}>
          Status:
          <Text
            style={[
              styles.valueText,
              item.status === 'approved' ? styles.approved : styles.pending,
            ]}>
            {' '}
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
            screenHeader={'Sell Coin List'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={sellCoin}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      }
    />
  );
};

export default SellCoin;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: width * 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  valueText: {
    fontWeight: '500',
    color: '#333',
  },
  approved: {
    color: '#4caf50',
  },
  pending: {
    color: '#ffa726',
  },
});
