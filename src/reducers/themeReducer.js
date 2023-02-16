import {createSlice} from "@reduxjs/toolkit";



// created  a reducer for theme
const themeSlice = createSlice({
    name:"myTheme",
    initialState:false,
    reducers:{
        themechange(prevstate){
            return !prevstate
        }
    },
})

export const {themechange} = themeSlice.actions;
export default themeSlice.reducer;