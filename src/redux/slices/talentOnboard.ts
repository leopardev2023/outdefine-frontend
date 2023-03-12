import { dialCodes } from "./../../components/V2/DialCodeInput/DialCodeInput";
import profileAPI from "network/profile";
import { getItem } from "utils/storageUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { logOut } from "./authentication";
import {
  LevelOfExperience,
  YearOfExperience,
} from "views/onboardingV2/talent/Experience/Experience.data";
import { EnglishProficiency } from "views/onboardingV2/talent/Location/Location.data";
import { channels } from "views/onboardingV2/talent/Socials/Channels.data";

export type TalentOnboardState = {
  step: number;
  // about myself
  first_name: string;
  last_name: string;
  dial_code: IDialCodeObject | undefined;
  phone_number: string;
  resume: File | undefined;
  role: number | undefined;
  primary_skills: Array<any>;
  secondary_skills: Array<any>;
  // location
  country: string;
  city: string;
  english_fluency: number | undefined;
  // experience
  years_of_experience: number | undefined;
  level_of_experience: number | undefined;
  hourly_rate: string | number;
  // socials
  website_link: string;
  linkedin_link: string;
  github_link: string;
  talent_source: number | undefined;
  other: string;
};

const initialState: TalentOnboardState = {
  step: -1,
  // about myself
  first_name: "",
  last_name: "",
  dial_code: undefined,
  phone_number: "",
  resume: undefined,
  role: undefined,
  primary_skills: [],
  secondary_skills: [],
  // location
  country: "",
  city: "",
  english_fluency: undefined,
  // experience
  years_of_experience: undefined,
  level_of_experience: undefined,
  hourly_rate: "",

  // socials
  website_link: "",
  linkedin_link: "",
  github_link: "",
  talent_source: undefined,
  other: "",
};

// This method retrieves steps data from the database in case the user already filled them
export const getStepsData = createAsyncThunk("getUserProfile", async () => {
  const email = getItem("email");
  const res = await profileAPI.getUserWithEmail(email);
  const user = res.data;
  const { data: profile } = await profileAPI.getUserProfile("freelancer", user.user_id);

  if (!profile) return initialState;

  // Step 1
  const primary_skills = profile.skills
    .filter((s) => s.freelancer_skill.is_primary)
    .map((s) => s.id);
  const secondary_skills = profile.skills
    .filter((s) => !s.freelancer_skill.is_primary)
    .map((s) => s.id);
  const dial_code = dialCodes.find((code) => code.value === user.dial_code);

  // Step 2
  let years_of_experience: number | undefined = YearOfExperience.findIndex(
    (y) => y.value === profile.years_of_experience,
  );
  years_of_experience =
    years_of_experience === -1 ? initialState.years_of_experience : years_of_experience;
  let level_of_experience: number | undefined = LevelOfExperience.findIndex(
    (l) => l.value === profile.level_of_experience,
  );
  level_of_experience =
    level_of_experience === -1 ? initialState.level_of_experience : level_of_experience;

  // Step 3
  let english_fluency: number | undefined = EnglishProficiency.findIndex(
    (e) => e.value === profile.english_fluency,
  );
  english_fluency = english_fluency === -1 ? initialState.english_fluency : english_fluency;

  // Step 4
  let talent_source: number | undefined = channels.findIndex(
    (c) => c.value === profile?.FreelancerProfileSocialLink?.talent_source,
  );
  talent_source = talent_source === -1 ? initialState.talent_source : talent_source;

  return {
    // about myself
    first_name: user.first_name,
    last_name: user.last_name,
    dial_code,
    role: profile.role,
    phone_number: profile.phone_number,
    primary_skills,
    secondary_skills,
    // experience
    years_of_experience,
    level_of_experience,
    hourly_rate: profile.hourly_rate,
    // location
    country: profile.country,
    city: profile.city,
    english_fluency,
    // socials
    website_link: profile?.FreelancerProfileSocialLink?.website_link,
    linkedin_link: profile?.FreelancerProfileSocialLink?.linkedin_link,
    github_link: profile?.FreelancerProfileSocialLink?.github_link,
    talent_source,
    other: profile?.FreelancerProfileSocialLink?.other,
  };
});

export const TalentOnboardSlice = createSlice({
  name: "talentOnboard",
  initialState,
  reducers: {
    goForward: (state) => {
      if (state.step > 5) return state;
      state.step = state.step + 1;
      return state;
    },
    goBackward: (state) => {
      if (state.step <= 0) return state;
      state.step = state.step - 1;
      return state;
    },
    setOnboardFields: (state, action: PayloadAction<any>) => {
      const { ...fields } = action.payload;
      state = { ...state, ...fields };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });

    builder.addCase(getStepsData.fulfilled, (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    });
  },
});

export const { goForward, goBackward, setOnboardFields } = TalentOnboardSlice.actions;

export default TalentOnboardSlice.reducer;
