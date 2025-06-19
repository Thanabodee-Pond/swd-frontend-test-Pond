
import { configureStore } from '@reduxjs/toolkit';
import personReducer from './personSlice';
import { loadState, saveState } from '../localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    persons: personReducer,
  },
  preloadedState,
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    saveState({ 
        persons: store.getState().persons 
    });
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

