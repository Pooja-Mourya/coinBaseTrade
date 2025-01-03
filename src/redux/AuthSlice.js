import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  loading: false,
  error: null,
  profileData:null,
  isAdmin:null,
  userBalance : {
    userId:null,
    balance:0
  },
  notificationCount:0
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AllData: (state, action) => {
      state.profileData = action.payload;
    },
    UserData: (state, action) => {
      state.userData = action.payload;
    },
    IsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    UserBalance: (state, action) => {
      state.userBalance = action.payload;
    },
    NotificationCount: (state, action) =>{
      state.notificationCount = action.payload
    },
    Loading: (state, action) => {
      state.loading = action.payload;
    },
    Error: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {UserData, Loading, Error, IsAdmin, AllData, UserBalance, NotificationCount} = userSlice.actions;
export default userSlice.reducer;
