import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import venueReducer from './venues/venueSlice';
import interactionReducer from './interactions/interactionSlice';
import performanceReducer from './performances/performanceSlice';
import uiReducer from './ui/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    venues: venueReducer,
    interactions: interactionReducer,
    performances: performanceReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths for non-serializable values
        ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;