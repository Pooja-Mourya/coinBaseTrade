import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonButton from '../../common/CommonButton';
import {useNavigation} from '@react-navigation/native';
import { useWallet } from '../../hooks/WalletProvider';

const UserBalanceHistory = () => {
  const navigation = useNavigation();
  const { walletData } = useWallet();
  
  return (
    <View>
      <Text style={{color:'#fff', fontWeight:'600', fontSize:18}}>{walletData?.balance.toFixed(2)}</Text>
      <CommonButton
        title={'User Transaction List'}
        onPress={() => navigation.navigate("UserTransaction")}
      />
    </View>
  );
};          

export default UserBalanceHistory;

const styles = StyleSheet.create({});
