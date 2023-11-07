import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsSliceReducer from './contactsSlice';
import filtersSlice from './filtersSlice';

const persistConfig = {
  key: 'contacts',
  storage,
  whiteList: ['contacts'],
};

const redPers = persistReducer(persistConfig, contactsSliceReducer);

const persistMiddleware = getDefaultMiddleware({
  thunk: false,
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    contacts: redPers,
    filter: filtersSlice,
  },
  middleware: [...persistMiddleware],
});

export const persistor = persistStore(store);
