import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import {useWallet} from '../../../hooks/WalletProvider';

const { width, height } = Dimensions.get('window');
const UserTransaction = () => {
  const token = useSelector(state => state.auth.userData);
  const {fetchWalletData, walletData} = useWallet();
  const navigation = useNavigation();
  useEffect(() => {
    fetchWalletData();
  }, [token]);

  const formatDate = date => new Date(date).toLocaleString();

  const TransactionItem = ({item}) => (
    <View
      style={[
        styles.itemContainer,
        item.type === 'credit' ? styles.credit : styles.debit,
      ]}>
      <Text style={styles.text}>Amount: ${item.amount.toFixed(2)}</Text>
      <Text style={styles.text}>Type: {item.type}</Text>
      <Text style={styles.text}>Date: {formatDate(item.date)}</Text>
    </View>
  );
  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'User Transaction'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={walletData.transactions ?? []}
            keyExtractor={item => item._id}
            renderItem={({item}) => <TransactionItem item={item} />}
          />
        </>
      }
    />
  );
};

export default UserTransaction;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: width*0.9,
  },
  credit: {
    backgroundColor: '#e0f7e0', // light green for credit
  },
  debit: {
    backgroundColor: '#f7e0e0', // light red for debit
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
});
