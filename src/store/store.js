import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../reducers/themeReducer";


// created the redux store
export const store = configureStore({
    reducer:{
        theme: themeReducer,
    }
}) 