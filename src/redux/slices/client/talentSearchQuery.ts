import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  industry: "",
  location: [],
  max_hourly: 0,
  min_hourly: 0,
  seniority_level: [],
  talent_location: "",
  term: [],
  text: "",
  timezone: [],
};

export const TalentSearchQuerySlice = createSlice({
  name: "talentSearchQuery",
  initialState,
  reducers: {
    updateText: (state, action: PayloadAction<any>) => {
      state.text = action.payload;
      return state;
    },
    updateTalentLocation: (state, action: PayloadAction<any>) => {
      state.talent_location = action.payload;
      return state;
    },
    updateMinHourlyRate: (state, action: PayloadAction<any>) => {
      state.min_hourly = action.payload;
      return state;
    },
    updateMaxHourlyRate: (state, action: PayloadAction<any>) => {
      state.max_hourly = action.payload;
      return state;
    },
    updateTerm: (state, action: PayloadAction<any>) => {
      state.term = action.payload;
      return state;
    },
    updateLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
      return state;
    },
    updateTimezone: (state, action: PayloadAction<any>) => {
      state.timezone = action.payload;
      return state;
    },
    updateSeniorityLevel: (state, action: PayloadAction<any>) => {
      state.seniority_level = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateText,
  updateTalentLocation,
  updateMinHourlyRate,
  updateMaxHourlyRate,
  updateTerm,
  updateLocation,
  updateTimezone,
  updateSeniorityLevel,
} = TalentSearchQuerySlice.actions;

export default TalentSearchQuerySlice.reducer;
