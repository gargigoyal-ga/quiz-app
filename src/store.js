import { ActionTypes } from "@mui/base";
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { REHYDRATE } from "redux-persist";
// import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};



const reducer = (state={},action) => {
  switch (ActionTypes.type) {
    case "SET_VALUE":
      return { ...StaticRange, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ app: reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

