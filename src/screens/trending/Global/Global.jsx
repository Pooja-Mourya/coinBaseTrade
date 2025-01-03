import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, RefreshControl } from 'react-native';
import apiService from '../../../redux/apiService';

const Global = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [cryptoList, setCryptoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCryptoList = async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const data = {
      page: isRefreshing ? 1 : page,
      per_page: perPage,
    };

    try {
      const response = await apiService({
        endPoint: `crypto/getList?page=${page}&per_page=${perPage}`,
        method: 'GET',
        data,
      });

      console.log("response : ", response)

      setCryptoList(isRefreshing ? response.data : [...cryptoList, ...response.data]); // Replace data if refreshing
      if (isRefreshing) setPage(1); // Reset to page 1 on refresh
    } catch (error) {
      console.error("Error fetching crypto list:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCryptoList();
  }, [page, perPage]);

  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onRefresh = () => {
    fetchCryptoList(true); // Pass `true` to indicate it's a refresh
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.name}</Text>
      <Text>{item.symbol}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cryptoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && !refreshing ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Button title="Show 100 items per page" onPress={() => setPerPage(100)} />
    </View>
  );
};

export default Global;

