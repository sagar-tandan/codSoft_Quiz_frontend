import usersSlice from "./usersSlice.jsx";
import loaderSlice from "./loaderSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: usersSlice,
    loaders: loaderSlice,
  },
});

export default store;
