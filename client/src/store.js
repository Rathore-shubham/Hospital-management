import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice"; // Ensure the path is correct

const store = configureStore({
  reducer: {
    patients: patientReducer, // Ensure the key matches the slice name
  },
});

export default store;
