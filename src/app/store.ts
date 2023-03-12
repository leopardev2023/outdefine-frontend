import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "redux/slices/authentication";
import JobSlice from "redux/slices/jobs";
import onboardSlice from "redux/slices/onboarding";
import ProfileSlice from "redux/slices/profile";
import AssessmentSlice from "redux/slices/assessment";
import PrototypeSlice from "redux/slices/prototype";
import TokenSlice from "redux/slices/token";
import ApplicationSlice from "redux/slices/application";
import TalentOnboardSlice from "redux/slices/talentOnboard";
import ClientOnboardSlice from "redux/slices/clientOnboard";
import TalentSearchQuerySlice from "redux/slices/client/talentSearchQuery";

// client slices
import ComapnyProfileSlice from "redux/slices/companyProfile";
import ComapnyJobSlice from "redux/slices/companyJobs";

export const store = configureStore({
  reducer: {
    talentSearchQuery: TalentSearchQuerySlice,
    authentication: authenticationSlice,
    onboard: onboardSlice,
    talentOnboard: TalentOnboardSlice,
    profile: ProfileSlice,
    prototype: PrototypeSlice,
    job: JobSlice,
    assessment: AssessmentSlice,
    token: TokenSlice,
    application: ApplicationSlice,
    // client side
    clientOnboard: ClientOnboardSlice,
    companyprofile: ComapnyProfileSlice,
    companyjob: ComapnyJobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
