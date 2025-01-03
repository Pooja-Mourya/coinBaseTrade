import { configureStore , getDefaultMiddleware} from '@reduxjs/toolkit';
import homeReducer from '../screens/home/HomeSlice';
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    coin: homeReducer,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     warnAfter: 128, // Increase threshold (e.g., to 128ms)
    //   },
    // }),
});

export default store;
