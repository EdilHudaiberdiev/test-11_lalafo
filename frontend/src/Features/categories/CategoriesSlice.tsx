import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {ICategory} from '../../types';
import {getCategories} from './CategoriesThunk';


interface categoriesState {
  categories: ICategory[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  isError: false,
};

export const selectCategories = (state: RootState) => state.categories?.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories?.isLoading;

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }
});


export const CategoriesReducer = CategoriesSlice.reducer;