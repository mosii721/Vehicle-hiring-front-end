import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { HistoryApi } from '../Pages/History/HistoryAPI';
import loginAPI from "../Pages/Login/LoginAPI";
import authReducer from '../Pages/Login/Slice';
import { registerApi } from "../Pages/Register/RegisterAPI";
import { BookingpaymentApim } from "../Pages/Booking/BookingAPI";
import { fleetApi } from "../Pages/Fleet/FleetAPI";
import { supportApi } from "../Pages/Support/SupportAPI";
import { ticketsApi } from "../Pages/Tickets/TicketsAPI";


const persistConfig = {
    key: 'root',
    storage,
};


const rootReducer: Reducer = combineReducers({
    [HistoryApi.reducerPath]: HistoryApi.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    auth: authReducer, 
    [registerApi.reducerPath]: registerApi.reducer,
    
    [fleetApi.reducerPath]: fleetApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [BookingpaymentApim.reducerPath]: BookingpaymentApim.reducer,

});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
           HistoryApi.middleware,
           loginAPI.middleware,
           registerApi.middleware,
           BookingpaymentApim.middleware,
           fleetApi.middleware,
           supportApi.middleware,
           ticketsApi.middleware,
        ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);