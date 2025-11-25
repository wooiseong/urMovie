import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./modules/settingSlice";
import userReducer from "./modules/userSlice";
import journalReducer from "./modules/journalSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// @ts-ignore
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["setting", "journal"],
};

const persistedReducer = persistReducer(persistConfig, settingReducer);

export const store = configureStore({
  reducer: {
    setting: persistedReducer,
    user: userReducer,
    journal: journalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
