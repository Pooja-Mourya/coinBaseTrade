import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastAndroid } from "react-native";
import apiService from "../redux/apiService";


export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.userData);
  const userId = useSelector((state) => state.auth.profileData);

  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWalletData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService({
        endpoint: `/razorpay/walletById/${userId?.user?._id}`,
        headers: {
          Authorization: token,
        },
      });
      setWalletData(response.wallet);
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError(err.message);
      ToastAndroid.show(`Error fetching wallet data: ${err.message}`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (userId?.user?._id && token) {
      fetchWalletData();
    }
  }, [userId?.user?._id, token]);

  return (
    <WalletContext.Provider value={{ walletData, fetchWalletData, loading, error }}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = () => React.useContext(WalletContext);
