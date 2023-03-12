/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
import { Auth } from "aws-amplify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import OnboardingAPI from "network/onboarding";

import { OnboardStatus, SignupAccount } from "@types";
import LogRocket from "logrocket";
import { setItem } from "utils/storageUtils";
import { isStaging } from "helpers/env";
import { mixpanel_register } from "helpers/mixpanel";

const getInitialState = (): AuthState => ({
  firstName: "",
  lastName: "",
  isFetching: false,
  isAuthenticated: false,
  userSub: "",
  userRole: "",
  userId: "",
  avatar: "",
  onboardStatus: OnboardStatus.TODO,
  onboardClientStatus: OnboardStatus.TODO,
  accountType: SignupAccount.talent,
  createdAt: "",
});

export const loadAuth = createAsyncThunk("auth/login", async () => {
  try {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });

    const username = user?.username;
    const email = user?.signInUserSession?.idToken?.payload?.email ?? "";

    const userData = await OnboardingAPI.getUserDetail(email).then(
      (response) => response?.data ?? null,
    );
    const { user_type, user_id, first_name = "", last_name = "", createdAt } = userData;

    let profile: any = {};
    if (user_type.toLowerCase() === "freelancer" || user_type.toLowerCase() === "admin") {
      profile = await OnboardingAPI.getFreelancerProfile(user_id).then((response) => response.data);
    } else if (user_type.toLowerCase() === "client") {
      profile = await OnboardingAPI.getClientProfile(user_id).then((response) => response.profile);
    }

    // register industry and role to mixpanel
    if (profile?.industry_id !== undefined) {
      mixpanel_register({
        industry: profile?.industry_id,
      });
    }
    if (profile?.primary_role !== undefined) {
      mixpanel_register({ role: profile?.primary_role });
    }

    const userRole: string = user_type.toLowerCase() === "client" ? "Client" : "Freelancer";
    setItem("userRole", userRole);
    const onboardingStatus = profile?.onboarding_status?.toLowerCase() || OnboardStatus.TODO;
    const userAvatar: string = userData?.avatar ?? "";

    if (user && userData) {
      if (isStaging) {
        LogRocket.identify(email);
      }
      setItem("email", email);
      setItem("onboardingStatus", onboardingStatus);
      return {
        firstName: first_name,
        lastName: last_name,
        isFetching: false,
        isAuthenticated: true,
        userId: user_id,
        userSub: username,
        userRole,
        onboardStatus: userRole === "Freelancer" ? onboardingStatus : OnboardStatus.TODO,
        onboardClientStatus: userRole === "Client" ? onboardingStatus : OnboardStatus.TODO,
        avatar: userAvatar,
        createdAt,
      };
    } else {
      logOut();
    }
  } catch (err) {
    logOut();
    console.log("err: ", err);
  }
  return getInitialState();
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  localStorage.clear();
  sessionStorage.clear();
  await Auth.signOut();
});

export const AuthSlice = createSlice({
  name: "authentication",
  initialState: getInitialState(),
  reducers: {
    setAccountTypeToCreate: (state, action) => {
      const { accountType } = action.payload;
      state.accountType = accountType;
    },
    setAuthenication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAuth.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loadAuth.fulfilled, (state, action) => {
      state = { ...action.payload };
      console.log('loadAuth fulfilled');
      localStorage.removeItem("OUTDEFINE_password");
      // Either the network is not available or user details are not loading
      if (state.isAuthenticated === false) {
        localStorage.clear();
        sessionStorage.clear();
      }
      return state;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state = getInitialState();
      return state;
    });
  },
});

export const { setAccountTypeToCreate, setAuthenication } = AuthSlice.actions;

export default AuthSlice.reducer;
