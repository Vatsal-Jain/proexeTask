import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const reducer = {
    usersList: userReducer
}

export const store = configureStore({
   reducer: reducer,
   devTools: true
})

export default store;

