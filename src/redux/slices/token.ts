import * as Sentry from "@sentry/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit';
import tokenAPI from "network/token";
import { TokenState } from "redux/types/token";
import { logOut } from "./authentication";

const initialState: TokenState = {
  is_busy: false,
  balance: 0,
  rewardsHistory: [],
  referralsHistory: [],
  aggregatedRewardsHistory: [],
};

export const getBalance = createAsyncThunk(
  "token/getBalance",
  async (user_id: number) => {
    let response: any;
    try {
      response = await tokenAPI.getWalletBalance(user_id);
    } catch (err) {
      Sentry.captureException(err);
    }

    return response.data;
  },
);

export const getRewards = createAsyncThunk(
  "token/getRewards",
  async (user_id: number) => {
    let response: any;
    try {
      response = await tokenAPI.getRewardHistory(user_id);
    } catch (err) {
      Sentry.captureException(err);
    }

    return response.data;
  },
);

export const getReferrals = createAsyncThunk(
  "token/getReferrals",
  async (user_id: number, thunkAPI) => {
    let response: any;
    try {
      response = await tokenAPI.getReferralsHistory(user_id);
    } catch (err) {
      Sentry.captureException(err);
    }

    return response;
  },
);

export const getAggregatedRewardHistory = createAsyncThunk(
  "token/getAggregatedRewardHistory",
  async (args: any, thunkAPI) => {
    const { user_id, filter } = args;
    let response: any;
    try {
      response = await tokenAPI.getAggregatedRewardHistory(user_id, filter);
    } catch (err) {
      Sentry.captureException(err);
    }
    return response.data;
  },
);

export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload.data.balance ?? 0;
      return state;
    });
    builder.addCase(getRewards.fulfilled, (state, action) => {
      state.rewardsHistory = action.payload.data ?? [];
      return state;
    });
    builder.addCase(getReferrals.fulfilled, (state, action) => {
      state.referralsHistory = action.payload.data ?? [];
      state.is_busy = false;
      return state;
    });
    builder.addCase(getAggregatedRewardHistory.fulfilled, (state, action) => {
      state.aggregatedRewardsHistory = action.payload.data ?? [];
      return state;
    });

    builder.addCase(getReferrals.pending, (state) => {
      state.is_busy = true;
      return state;
    });
    builder.addCase(getReferrals.rejected, (state) => {
      state.is_busy = false;
      return state;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

export const {} = TokenSlice.actions;

export default TokenSlice.reducer;
