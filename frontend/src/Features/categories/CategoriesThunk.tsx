import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';


export const getCategories = createAsyncThunk(
  'categories/get-all',
  async () => {
    const response = await axiosApi.get(`categories`);
    return response.data ?? [];
  });
