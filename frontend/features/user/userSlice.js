import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    userGoals: null,
    userMeals: [],
    pastDays: [],
  },
  reducers: {
    setUser: (state, action) => { state.userInfo = action.payload},

    setUserMeals: (state, action) => { state.userMeals = action.payload.meals},
    addMeal: (state, action) => { state.userMeals.push(action.payload);},

    setGoals: (state, action) => {state.userGoals = action.payload},
    setPastDays: (state, action) => {state.pastDays = action.payload.days}
  }
})


export const { setUser, setUserMeals, setPastDays, addMeal, setGoals } = userSlice.actions;
export const selectGoals = (state) => state.user.userGoals;
export const selectUser = (state) => state.user.userInfo;
export const selectUserMeals = (state) => state.user.userMeals;
export const selectPastDays = (state) => state.user.pastDays;


export default userSlice.reducer;
