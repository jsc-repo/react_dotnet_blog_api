import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {
    // Reducer comes here
    setUser: (state, action) => {
      //console.log(action.payload);
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },

  extraReducers: {
    // Extra reducer comes here
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

// userObj returned after successfully registering
// blogPosts: Array []
// ​​email: "fake03@email.com"
// ​​id: 4
// ​​role: "User"
// ​username: "user 03"
