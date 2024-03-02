import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IItem} from '../../types';
import {addItem, deleteItemById, getItems, getItemsByCategory, getOneItemById} from './ItemsThunk';


interface itemsState {
  items: IItem[];
  item: IItem | null;
  isLoading: {
    add: boolean,
    get: boolean,
    delete: boolean,
  },
  isError: boolean;
}

const initialState: itemsState = {
  items: [],
  item: null,
  isLoading:  {
    add: false,
    get: false,
    delete: false
  },
  isError: false,
};

export const selectItems = (state: RootState) => state.items?.items;
export const selectItem = (state: RootState) => state.items?.item;
export const selectItemsLoading = (state: RootState) => state.items?.isLoading;
export const selectItemsErrors = (state: RootState) => state.items?.isError;

const ItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    cleanItem: (state) => {
      state.item = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isLoading.get = true;
      state.isError = false;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.isLoading.get = false;
      state.items = action.payload;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.isLoading.get = false;
      state.isError = true;
    });

    builder.addCase(getOneItemById.pending, (state) => {
      state.isLoading.get = true;
      state.isError = false;
    });
    builder.addCase(getOneItemById.fulfilled, (state, action) => {
      state.isLoading.get = false;
      state.item = action.payload;
    });
    builder.addCase(getOneItemById.rejected, (state) => {
      state.isLoading.get = false;
      state.isError = true;
    });

    builder.addCase(getItemsByCategory.pending, (state) => {
      state.isLoading.get = true;
      state.isError = false;
    });
    builder.addCase(getItemsByCategory.fulfilled, (state, action) => {
      state.isLoading.get = false;
      state.items = action.payload;
    });
    builder.addCase(getItemsByCategory.rejected, (state) => {
      state.isLoading.get = false;
      state.isError = true;
    });

    builder.addCase(deleteItemById.pending, (state) => {
      state.isLoading.delete = true;
      state.isError = false;
    });
    builder.addCase(deleteItemById.fulfilled, (state) => {
      state.isLoading.delete = false;
    });
    builder.addCase(deleteItemById.rejected, (state) => {
      state.isLoading.delete = false;
      state.isError = true;
    });

    builder.addCase(addItem.pending, (state) => {
      state.isLoading.add = true;
      state.isError = false;
    });
    builder.addCase(addItem.fulfilled, (state) => {
      state.isLoading.add = false;
    });
    builder.addCase(addItem.rejected, (state) => {
      state.isLoading.add = false;
      state.isError = true;
    });
  }
});


export const ItemsReducer = ItemsSlice.reducer;
export const {cleanItem} = ItemsSlice.actions;