import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    userMeals: [],
  },
  reducers: {
    setUser: (state, action) => { state.userInfo = action.payload},
    setUserMeals: (state, action) => { state.userMeals = action.payload.meals},
    addMeal: (state, action) => { state.userMeals.push(action.payload);}
  }
})


export const { setUser, setUserMeals, addMeal } = userSlice.actions;
export const selectUser = (state) => state.user.userInfo;
export const selectUserMeals = (state) => state.user.userMeals;
export default userSlice.reducer;
