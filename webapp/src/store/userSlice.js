import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  isAuthChecked: false,
  isLoggingOut: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = null;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload
    },
    setIsLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload
    }
  }
});

export const { setLogin, logout, setIsAuthChecked, setIsLoggingOut } = userSlice.actions;
export default userSlice.reducer;