import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CreateExperienceType, CreatePortfolioType } from "redux/types/profile";

import profileAPI from "network/profile";
import onboardingAPI from "network/onboarding";
import { logOut } from "./authentication";

const initialState: ITalentProfileV2 = {
  is_busy: false,
  FreelancerProfileEducations: [],
  FreelancerProfileExperiences: [],
  FreelancerProfilePortfolios: [],
  FreelancerProfileSocialLink: {
    freelancer_id: 0,
  },
  User: {
    user_id: 0,
    email_id: "",
    is_deleted: false,
    referral_link: "",
    user_type: "CLIENT",
  },
  Role: {
    name: "",
  },
  assessment_visibility: true,
  city: "",
  industry_id: -1,
  role: -1,
  country: "",
  dial_code: "",
  phone_number: "",
  freelancer_id: 0,
  first_name: "",
  last_name: "",
  job_type: 0,
  hourly_rate: 0,
  level_of_experience: "",
  primary_role: 0,
  resume: "",
  roles_open_to: "",
  terms_open_to: "",
  skills: [],
  summary: "",
  is_trusted_talent: null,
  years_of_experience: "",
};

export const getUserID = createAsyncThunk("getUserID", async () => {
  const email = localStorage.getItem("OUTDEFINE_email")?.replaceAll("\"", "") || "";
  const res = await profileAPI.getUserWithEmail(email);
  return res;
});

export const getTalentProfile = createAsyncThunk("getUserProfile", async () => {
  const email = localStorage.getItem("OUTDEFINE_email")?.replaceAll("\"", "") || "";
  const res = await profileAPI.getUserWithEmail(email);
  const user = res.data;
  const profile = await profileAPI.getUserProfile("freelancer", user.user_id);

  return {
    freelancer_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    data: profile.data,
  };
});

export const updateTalentSkills = createAsyncThunk(
  "updateTalentSkills",
  async ({ freelancer_id, skills }: { freelancer_id: number; skills: ITalentSkillV2[] }) => {
    const result = await profileAPI.updateProfileSkills(freelancer_id, skills);
    return result;
  },
);

export const updateTalentProfile = createAsyncThunk(
  "updateTalentProfile",
  async (data: ITalentProfileV2) => {
    const result = await profileAPI.updatePreference(data);
    return { result, data };
  },
);

export const updateTalentProfileSocials = createAsyncThunk(
  "updateTalentSocials",
  async (data: ITalentSocialLink) => {
    const result = await profileAPI.updateProfileSocials(data);
    return { result, data };
  },
);

export const uploadPortfolioCoverImage = createAsyncThunk(
  "uploadPortfolioCoverImage",
  async (file: File) => {
    const result = await profileAPI.uploadCoverPhoto(file);
    return result;
  },
);

export const createProfilePortfolioBatch = createAsyncThunk(
  "createProfilePortfolioBatch",
  async ({ email_id, data }: CreatePortfolioType) => {
    const result = await profileAPI.createProfilePortfolioBatch(email_id, data);
    return result;
  },
);

export const updateProfilePortfolioBatch = createAsyncThunk(
  "updateProfilePortfolioBatch",
  async (data: ITalentPortfolio[]) => {
    const result = await profileAPI.updateProfilePortfolioBatch(data);
    return result;
  },
);

export const removeProfilePortfolioBatch = createAsyncThunk(
  "removeProfilePortfolioBatch",
  async ({ freelancer_id, data }: { freelancer_id: number; data: number[] }) => {
    const result = await profileAPI.removeProfilePortfolioBatch(freelancer_id, data);
    return result;
  },
);

export const createProfileExperienceBatch = createAsyncThunk(
  "createProfileExperienceBatch",
  async ({ email_id, data }: CreateExperienceType) => {
    const result = await profileAPI.createProfileExperienceBatch(email_id, data);
    return result;
  },
);

export const updateProfileExperienceBatch = createAsyncThunk(
  "updateProfileExperienceBatch",
  async (data: Array<ITalentExperience>) => {
    const result = await profileAPI.updateProfileExperienceBatch(data);
    return result;
  },
);

export const removeProfileExperienceBatch = createAsyncThunk(
  "removeProfileExperienceBatch",
  async ({ freelancer_id, data }: { freelancer_id: number; data: number[] }) => {
    const result = await profileAPI.removeProfileExperienceBatch(freelancer_id, data);
    return result;
  },
);

export const createProfileEducationBatch = createAsyncThunk(
  "createProfileEducationBatch",
  async ({ id, data }: { id: string; data: Array<ITalentEducation> }) => {
    const result = await profileAPI.createProfileEducationBatch(id, data);
    return result;
  },
);

export const updateProfileEducationBatch = createAsyncThunk(
  "updateProfileEducationBatch",
  async (data: ITalentEducation[]) => {
    const result = await profileAPI.updateProfileEducationBatch(data);
    return result;
  },
);

export const removeProfileEducationBatch = createAsyncThunk(
  "removeProfileEducationBatch",
  async ({ freelancer_id, data }: { freelancer_id: number; data: number[] }) => {
    const result = await profileAPI.removeProfileEducationBatch(freelancer_id, data);
    return result;
  },
);

export const uploadProfileBanner = createAsyncThunk("updateProfileBanner", async (data: File) => {
  const res = await onboardingAPI.uploadUserBanner(data);
  return res;
});

export const updateTalentUser = createAsyncThunk("updateTalentuser", async (data: IUser) => {
  const res = await onboardingAPI.updateUser(data);
  return res;
});

export const uploadTalentResume = createAsyncThunk("uploadTalentResume", async (data: File) => {
  const res = await onboardingAPI.uploadResume(data);
  return res;
});

export const uploadTalentUserAvatar = createAsyncThunk(
  "uploadTalentUserAvatar",
  async (data: File) => {
    const res = await onboardingAPI.uploadUserAvatarLogo(data);
    return res;
  },
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSingleChange: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state = {
        ...state,
        [action.payload.name]: action.payload.value,
      };
      return state;
    },
    setProfileData: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    setTalentProfileData: (state, action: PayloadAction<ITalentProfileV2>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserID.fulfilled, (state, action) => {
      // Add user to the state array
      state.freelancer_id = action.payload.data.user_id;
      // state.preference.first_name = action.payload.data.first_name;
      // state.preference.last_name = action.payload.data.last_name;
      return state;
    });

    builder.addCase(getTalentProfile.pending, (state: ITalentProfileV2) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(getTalentProfile.rejected, (state: ITalentProfileV2) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(getTalentProfile.fulfilled, (state: ITalentProfileV2, action) => {
      state = {
        ...action.payload.data,
        freelancer_id: action.payload.freelancer_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        is_busy: false,
      };
      return state;
    });

    builder
      .addCase(updateTalentProfile.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateTalentProfile.fulfilled, (state: ITalentProfileV2, action) => {
        state = { ...state, ...action.payload.data, is_busy: false };
        return state;
      })
      .addCase(updateTalentProfile.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(updateProfileEducationBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateProfileEducationBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileEducations = action.payload.data;
        return state;
      })
      .addCase(updateProfileEducationBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(createProfileEducationBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(createProfileEducationBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileEducations = action.payload.data;
        return state;
      })
      .addCase(createProfileEducationBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(createProfileExperienceBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(createProfileExperienceBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileExperiences = action.payload.data;
        return state;
      })
      .addCase(createProfileExperienceBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(updateProfileExperienceBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateProfileExperienceBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileExperiences = action.payload.data;
        return state;
      })
      .addCase(updateProfileExperienceBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(removeProfileExperienceBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(removeProfileExperienceBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileExperiences = action.payload.data;
        return state;
      })
      .addCase(removeProfileExperienceBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(removeProfileEducationBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(removeProfileEducationBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileEducations = action.payload.data;
        return state;
      })
      .addCase(removeProfileEducationBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(removeProfilePortfolioBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(removeProfilePortfolioBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfilePortfolios = action.payload.data;
        return state;
      })
      .addCase(removeProfilePortfolioBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(createProfilePortfolioBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(createProfilePortfolioBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfilePortfolios = action.payload.data;
        return state;
      })
      .addCase(createProfilePortfolioBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(updateProfilePortfolioBatch.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateProfilePortfolioBatch.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfilePortfolios = action.payload.data;
        return state;
      })
      .addCase(updateProfilePortfolioBatch.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(uploadPortfolioCoverImage.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(uploadPortfolioCoverImage.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        return state;
      })
      .addCase(uploadPortfolioCoverImage.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(updateTalentProfileSocials.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateTalentProfileSocials.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.FreelancerProfileSocialLink = action.payload.data;
        return state;
      })
      .addCase(updateTalentProfileSocials.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(uploadProfileBanner.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(uploadProfileBanner.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.User = action.payload.data;
        return state;
      })
      .addCase(uploadProfileBanner.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(updateTalentUser.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateTalentUser.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.User = action.payload.data;
        return state;
      })
      .addCase(updateTalentUser.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(uploadTalentUserAvatar.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(uploadTalentUserAvatar.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.User = action.payload.data;
        return state;
      })
      .addCase(uploadTalentUserAvatar.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(uploadTalentResume.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(uploadTalentResume.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.resume = action.payload.data.resume;
        return state;
      })
      .addCase(uploadTalentResume.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder
      .addCase(updateTalentSkills.pending, (state: ITalentProfileV2) => {
        state.is_busy = true;
        return state;
      })
      .addCase(updateTalentSkills.fulfilled, (state: ITalentProfileV2, action) => {
        state.is_busy = false;
        state.skills = action.payload.data.skills;
        return state;
      })
      .addCase(updateTalentSkills.rejected, (state: ITalentProfileV2) => {
        state.is_busy = false;
        return state;
      });

    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setSingleChange, setProfileData, setTalentProfileData } = ProfileSlice.actions;

export default ProfileSlice.reducer;
