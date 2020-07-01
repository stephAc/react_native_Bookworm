import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '../reducers/index';

const perstConfig = { key: 'root', storage: AsyncStorage };
const persistedReducer = persistReducer(perstConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
