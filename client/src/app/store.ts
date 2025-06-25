import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import venueReducer from '../features/venues/venueSlice';
import performanceReducer from '../features/performances/performanceSlice';
import interactionReducer from '../features/interactions/interactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    venues: venueReducer,
    performances: performanceReducer,
    interactions: interactionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
