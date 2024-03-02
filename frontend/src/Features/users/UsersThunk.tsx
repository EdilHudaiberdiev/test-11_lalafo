import { createAsyncThunk } from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import {RootState} from '../../app/store';
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from '../../types';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }>(
  'users/register',
  async (form, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', form);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (form, {rejectWithValue}) => {

    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', form);
      return response.data.user;
    } catch (e) {

      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState, rejectValue: GlobalError}>(
  'users/logout',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      await axiosApi.delete('/users/sessions', {headers: {'Authorization': token}});
    }catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);