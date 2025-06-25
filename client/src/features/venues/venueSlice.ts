import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import venueService from './venueService';

export interface Venue {
  id: string;
  userId: string;
  name: string;
  address?: string;
  city: string;
  state?: string;
  country: string;
  venueType?: string;
  capacity?: number;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  notes?: string;
  lastPerformedAt?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

interface VenueState {
  venues: Venue[];
  venue: Venue | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: VenueState = {
  venues: [],
  venue: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all venues
export const getVenues = createAsyncThunk('venues/getAll', async (_, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await venueService.getVenues(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get venue by ID
export const getVenueById = createAsyncThunk(
  'venues/getById',
  async (venueId: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await venueService.getVenueById(venueId, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new venue
export const createVenue = createAsyncThunk(
  'venues/create',
  async (venueData: Partial<Venue>, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await venueService.createVenue(venueData, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update venue
export const updateVenue = createAsyncThunk(
  'venues/update',
  async ({ venueId, venueData }: { venueId: string; venueData: Partial<Venue> }, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await venueService.updateVenue(venueId, venueData, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete venue
export const deleteVenue = createAsyncThunk(
  'venues/delete',
  async (venueId: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await venueService.deleteVenue(venueId, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search venues
export const searchVenues = createAsyncThunk(
  'venues/search',
  async (query: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await venueService.searchVenues(query, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const venueSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearVenue: (state) => {
      state.venue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVenues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.venues = action.payload;
      })
      .addCase(getVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getVenueById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVenueById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.venue = action.payload;
      })
      .addCase(getVenueById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createVenue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.venues.push(action.payload);
      })
      .addCase(createVenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateVenue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.venues = state.venues.map((venue) =>
          venue.id === action.payload.id ? action.payload : venue
        );
        state.venue = action.payload;
      })
      .addCase(updateVenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteVenue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.venues = state.venues.filter((venue) => venue.id !== action.payload.id);
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(searchVenues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.venues = action.payload;
      })
      .addCase(searchVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, clearVenue } = venueSlice.actions;
export default venueSlice.reducer;
