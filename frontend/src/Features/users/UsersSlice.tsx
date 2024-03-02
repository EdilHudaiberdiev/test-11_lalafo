import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {GlobalError, User, ValidationError} from '../../types';
import {login, logout, register} from './UsersThunk';

interface UsersState {
  user: User | null,
  registerLoading: boolean,
  registerError: ValidationError | null,
  loginLoading: boolean;
  loginError: GlobalError | null;
  logoutLoading: boolean;
  logoutError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  logoutError: null,
};


export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;

export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;

export const selectLogoutLoading = (state: RootState) => state.users?.logoutLoading;
export const selectLogoutError = (state: RootState) => state.users?.logoutError;



export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });

    builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });

    builder.addCase(register.rejected, (state,  {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });

    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });

    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
      state.logoutError = null;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
      state.user = null;
    });

    builder.addCase(logout.rejected, (state, {payload: error}) => {
      state.logoutLoading = false;
      state.logoutError = error || null;
    });
  },
});



export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;