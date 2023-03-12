import * as Sentry from "@sentry/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import profileAPI from "network/profile";
import AssessmentAPI from "network/assessment";
import { getItem } from "utils/storageUtils";

import { AssessmentState } from "redux/types/assessment";
import { logOut } from "./authentication";
import { consoleSandbox } from "@sentry/utils";

const initialState: AssessmentState = {
  role: {
    jobType: undefined,
    roleType: {},
    skills: [],
  },
  roles_skills: {
    jobs: [],
    roles: {},
    skills: {},
  },
  test_status: {
    engineer: false,
    design: false,
    product: false,
  },
  assessment_step: 0,
  hack_tests: [],
  cur_hack_test: null,
  vet_status: {},
  booking: {},
  confirmed: false,
};

export const getAssessmentInfoByEmail = createAsyncThunk(
  "assessment/info/getOneByEmail",
  async (email: string, thunkAPI) => {
    let response: any, bookingResponse: any;
    try {
      response = await AssessmentAPI.getAssessmentInfoByEmail({
        email_id: email,
      });
      bookingResponse = await AssessmentAPI.getBookingByUid(
        response.data?.data[0]?.booking_uid || "123",
      );
    } catch (err) {
      console.log("err: ", err);
      response = undefined;
      bookingResponse = undefined;
      Sentry.captureException(err);
    }

    return {
      vetStatusResponse: response?.data,
      bookingResponse: bookingResponse?.data,
    };
  },
);

export const fetchHackTests = createAsyncThunk("assessment/fetchHackTests", async (thunkAPI) => {
  let response: any;
  try {
    await AssessmentAPI.syncTestsDB();
    response = await AssessmentAPI.getAllTests();
  } catch (err) {
    console.log("err: ", err);
    Sentry.captureException(err);
  }
  return response?.data?.data;
});

export const getUserProfile = createAsyncThunk("getUserProfile", async () => {
  let profile: any;
  try {
    const email = getItem("email")?.replaceAll('"', "") || "";
    const res = await profileAPI.getUserWithEmail(email);
    const user = res.data;
    profile = await profileAPI.getUserProfile("freelancer", user.user_id);
  } catch (err) {
    console.log("err: ", err);
    Sentry.captureException(err);
  }
  return {
    data: profile.data,
  };
});

export const AssessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    setRolesSkills: (state, action: PayloadAction<any>) => {
      state.roles_skills = { ...action.payload };
      return state;
    },

    updateRole: (state, action: PayloadAction<any>) => {
      state.role = { ...action.payload };
      return state;
    },

    updateAssessmentStep: (state, action: PayloadAction<any>) => {
      state.assessment_step = action.payload;
      return state;
    },

    updateCurHackTest: (state, action: PayloadAction<any>) => {
      state.cur_hack_test = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch hackerearth tests
    builder.addCase(fetchHackTests.fulfilled, (state, action) => {
      state.hack_tests = action.payload ?? [];
      return state;
    });
    // fetch assessment info record
    builder.addCase(getAssessmentInfoByEmail.fulfilled, (state, action) => {
      const vet_status = action.payload?.vetStatusResponse?.data[0] ?? {};
      state.vet_status = vet_status;
      state.booking = action.payload?.bookingResponse?.booking;
      state.confirmed = action.payload?.vetStatusResponse?.confirmed;
      console.log("------");
      console.log(action.payload?.vetStatusResponse);
      state.assessment_step = action.payload?.vetStatusResponse?.confirmed ? 2 : 0;
      console.log(state.assessment_step);
      return state;
    });

    // builder.addCase(getUserProfile.fulfilled, (state, action) => {
    // state.assessment_step = action.payload.data.confirmed ? 2 : 0;
    // });
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

export const { setRolesSkills, updateRole, updateAssessmentStep, updateCurHackTest } =
  AssessmentSlice.actions;

export default AssessmentSlice.reducer;
