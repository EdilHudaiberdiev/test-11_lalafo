import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';


export const getItems = createAsyncThunk(
  'items/get-all',
  async () => {
    const response = await axiosApi.get(`items`);
    return response.data ?? [];
  });

export const getOneItemById = createAsyncThunk(
  'items/get-one-by-id',
  async (item_id: string) => {
    const response = await axiosApi.get(`items/${item_id}`);
    return response.data ?? null;
  });

export const getItemsByCategory = createAsyncThunk(
  'items/get-by-category',
  async (category_id: string) => {
    const response = await axiosApi.get(`items?category=${category_id}`);
    return response.data ?? [];
  });

export const deleteItemById = createAsyncThunk(
  'items/delete-by-id',
  async (item_id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state?.users?.user?.token) {
      await axiosApi.delete(`items/${item_id}`, {headers: {'Authorization': state.users.user.token}});
    }
  });

export const addItem = createAsyncThunk(
  'items/add',
  async (item: FormData, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state?.users?.user?.token) {
      await axiosApi.post(`items`, item, {headers: {'Authorization': state.users.user.token}} );
    }
  });



