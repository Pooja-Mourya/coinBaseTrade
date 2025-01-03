import {Dimensions, FlatList, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import apiService from '../../../redux/apiService';
import {useSelector} from 'react-redux';
import Container from '../../../common/Container';
import ScreenHeader from '../../../common/ScreenHeader';
import {useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const WithdrawList = () => {
  const token = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  const [withdrawData, setWithdrawData] = useState();
  useEffect(() => {
    const fetchWithdraw = async () => {
      try {
        const response = await apiService({
          endpoint: '/withdraw/allRequest/',
          headers: {
            Authorization: token,
          },
        });
        // console.log('response withdraw : ', response.withdrawals);
        setWithdrawData(response.withdrawals);
        ToastAndroid.show("Withdraw list show success fully", ToastAndroid.SHORT);

      } catch (error) {
        console.log('error : ', error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };
    fetchWithdraw();
  }, [token]);

  const formatDate = date => new Date(date).toLocaleString();

  const TransactionItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Amount: ${item.amount}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>
        Request Date: {formatDate(item.requestDate)}
      </Text>
      {item.approvalDate && (
        <Text style={styles.text}>
          Approval Date: {formatDate(item.approvalDate)}
        </Text>
      )}
    </View>
  );

  return (
    <Container
      content={
        <>
          <ScreenHeader
            screenHeader={'Withdraw List'}
            onPress={() => navigation.goBack()}
          />
          <FlatList
            data={withdrawData}
            keyExtractor={item => item._id}
            renderItem={({item}) => <TransactionItem item={item} />}
          />
        </>
      }
    />
  );
};

export default WithdrawList;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width:width*0.9
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color:'#000'
  },
});
