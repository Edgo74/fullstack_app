import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/produits?page=${page}`);
      return { data: response.data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/produits`, productData, {
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
        },
      });
      toast.success('Produit ajouté avec succès!');
      dispatch(fetchProducts(1));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.['hydra:description'] || error.message;
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${API_URL}/produits/${id}`, productData, {
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
        },
      });
      toast.success('Produit mis à jour avec succès!');
      dispatch(fetchProducts(1));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.['hydra:description'] || error.message;
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      await axios.delete(`${API_URL}/produits/${id}`);
      toast.success('Produit supprimé avec succès!');
      const { currentPage, totalPages } = getState().products;

      const newPage = currentPage > 1 && currentPage === totalPages ? currentPage - 1 : currentPage;
      dispatch(fetchProducts(newPage));
      return id;
    } catch (error) {
      const message = error.response?.data?.['hydra:description'] || error.message;
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
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
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;