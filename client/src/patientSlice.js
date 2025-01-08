import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk("patients/fetch", async () => {
  const response = await axios.get("http://localhost:5000/patients");
  return response.data;
});

export const addPatient = createAsyncThunk("patients/add", async (patient) => {
  const response = await axios.post("http://localhost:5000/patients", patient);
  return response.data;
});

export const dischargePatient = createAsyncThunk("patients/discharge", async (id) => {
  await axios.delete(`http://localhost:5000/patients/${id}`);
  return id;
});

const patientSlice = createSlice({
  name: "patients",
  initialState: { list: [] }, // Ensure initialState is defined here
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(dischargePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((patient) => patient._id !== action.payload);
      });
  },
});

export default patientSlice.reducer;
