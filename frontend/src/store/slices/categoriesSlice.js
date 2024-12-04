import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories?page=${page}`);
      return { data: response.data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, categoryData, {
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
        },
      });
      toast.success('Catégorie ajoutée avec succès!');
      dispatch(fetchCategories(1));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.['hydra:description'] || error.message;
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, {
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
        },
      });
      toast.success('Catégorie mise à jour avec succès!');
      dispatch(fetchCategories(1));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.['hydra:description'] || error.message;
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      toast.success('Catégorie supprimée avec succès!');
      const { currentPage, totalPages } = getState().categories;
      const newPage = currentPage > 1 && currentPage === totalPages ? currentPage - 1 : currentPage;
      dispatch(fetchCategories(newPage));
      return id;
    } catch (error) {
      const message = error.response?.data?.['hydra:description'] || error.message;
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.currentPage = action.payload.page;
        
        const totalItems = action.payload.data['hydra:totalItems'];
        
        if (action.payload.data['hydra:view'] && action.payload.data['hydra:view']['hydra:last']) {
          const lastPageUrl = action.payload.data['hydra:view']['hydra:last'];
          const match = lastPageUrl.match(/page=(\d+)/);
          if (match) {
            state.totalPages = parseInt(match[1], 10);
          } else {
            state.totalPages = Math.ceil(totalItems / state.itemsPerPage);
          }
        } else {
          state.totalPages = Math.ceil(totalItems / state.itemsPerPage);
        }
        
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch categories';
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;