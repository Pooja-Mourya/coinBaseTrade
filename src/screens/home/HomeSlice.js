import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quality: 0,
  price: 100, // Example base price
};

const qualitySlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    incrementQuality: (state) => {
      state.quality += 1;
      state.price += 10; 
    },
   
    decreasePrice: (state, action) => {
      const newPrice = state.price - action.payload;
      state.price = newPrice > 0 ? newPrice : 0; 
    },
  },
});

export const { incrementQuality, decreasePrice } = qualitySlice.actions;

export default qualitySlice.reducer;
