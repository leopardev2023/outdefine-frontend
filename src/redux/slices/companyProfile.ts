import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import CompanyProfileApi from "network/client/CompanyProfile";
import onboardingAPI from "network/onboarding";
import { logOut } from "./authentication";

const initialState: ICompanyProfile = {
  memebers: [],
  is_busy: false,
  company: {
    name: "Outdefine",
    stage: "Pre-funded",
    number_of_employees: "1-10",
    CompanySocialLink: {
      linkedin_link: "linkedin here",
      twitter_link: "twitter here",
      instagram_link: "instagram here",
    },
  },
  reviews: [],
};

export const getCompanyProfile = createAsyncThunk(
  "getCompanyProfile",
  async (id: number) => {
    const profile = await CompanyProfileApi.getCompanyIdFromUserId(id);
    return profile;
  },
);

export const getTeamMembers = createAsyncThunk(
  "getTeamMembers",
  async (companyId: number) => {
    const members = await CompanyProfileApi.getTeamMembersByCompanyId(
      companyId,
    );
    return members.success ? members.data : [];
  },
);

export const updateCompanyProfile = createAsyncThunk(
  "updateCompanyProfile",
  async (detail: ICompanyPreference) => {
    const res = await CompanyProfileApi.updateCompanyProfile(detail);
    return res;
  },
);

export const updateCompanyClientProfile = createAsyncThunk(
  "updateClientProfile",
  async (profile: IClientProfileUserAppended) => {
    const res = await CompanyProfileApi.updateClientProfile(profile);
    return res;
  },
);

export const updateCompanyLogo = createAsyncThunk(
  "updateCompanyLogo",
  async ({ data, companyId }: { data: File; companyId: number }) => {
    const res = await onboardingAPI.uploadCompanyLogo(data, companyId);
    return res;
  },
);

export const updateCompanyBanner = createAsyncThunk(
  "updateCompanyBanner",
  async ({ data, companyId }: { data: File; companyId: number }) => {
    const res = await onboardingAPI.uploadCompanyBanner(data, companyId);
    return res;
  },
);

export const uploadClientAvatar = createAsyncThunk(
  "updateAvatarofClient",
  async ({ data }: { data: File }) => {
    const res = await onboardingAPI.uploadUserAvatarLogo(data);
    return res;
  },
);

export const updateTeamMember = createAsyncThunk(
  "updateTeamMember",
  async (data: IClientProfileUserAppended) => {
    const res = await CompanyProfileApi.updateTeamMember(data);
    return res;
  },
);

export const ComapnyProfileSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setGlobalPreferences: (
      state: ICompanyProfile,
      action: PayloadAction<ICompanyPreference>,
    ) => {
      state.company = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyProfile.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(
      getCompanyProfile.fulfilled,
      (state: ICompanyProfile, action) => {
        state = action.payload;
        state.id = action.payload.company.company_id; // company_id
        state.client_id = action.payload.profile.client_id; // client_id
        state.company = action.payload.company;

        return state;
      },
    );

    builder.addCase(
      getCompanyProfile.rejected,
      (state: ICompanyProfile, action) => {
        state.is_busy = false;
        return state;
      },
    );

    builder.addCase(updateCompanyProfile.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(
      updateCompanyProfile.rejected,
      (state: ICompanyProfile, action) => {
        state.is_busy = false;
        return state;
      },
    );

    builder.addCase(
      updateCompanyProfile.fulfilled,
      (state: ICompanyProfile, action) => {
        state.company = { ...action.payload.data };
        state.is_busy = false;
        return state;
      },
    );

    builder.addCase(getTeamMembers.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(getTeamMembers.rejected, (state: ICompanyProfile) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(
      getTeamMembers.fulfilled,
      (state: ICompanyProfile, action) => {
        state.memebers = [...action.payload].filter(
          (elem) => elem.onboarding_status === "COMPLETED",
        );
        state.is_busy = false;
        return state;
      },
    );

    builder.addCase(updateCompanyLogo.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(updateCompanyLogo.rejected, (state: ICompanyProfile) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(
      updateCompanyLogo.fulfilled,
      (state: ICompanyProfile, action) => {
        state.is_busy = false;
        state.company = action.payload.data;
        return state;
      },
    );

    builder.addCase(updateCompanyBanner.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(updateCompanyBanner.rejected, (state: ICompanyProfile) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(
      updateCompanyBanner.fulfilled,
      (state: ICompanyProfile, action) => {
        state.is_busy = false;
        return state;
      },
    );

    builder.addCase(
      updateCompanyClientProfile.pending,
      (state: ICompanyProfile) => {
        state.is_busy = true;
        return state;
      },
    );

    builder.addCase(
      updateCompanyClientProfile.rejected,
      (state: ICompanyProfile) => {
        state.is_busy = false;
        return state;
      },
    );

    builder.addCase(
      updateCompanyClientProfile.fulfilled,
      (state: ICompanyProfile, action) => {
        state.is_busy = false;
        state.profile = action.payload.profile;
        return state;
      },
    );

    builder.addCase(uploadClientAvatar.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(uploadClientAvatar.rejected, (state: ICompanyProfile) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(uploadClientAvatar.fulfilled, (state: ICompanyProfile) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(updateTeamMember.pending, (state: ICompanyProfile) => {
      state.is_busy = true;
      return state;
    });

    builder.addCase(updateTeamMember.rejected, (state: ICompanyProfile) => {
      state.is_busy = false;
      return state;
    });

    builder.addCase(
      updateTeamMember.fulfilled,
      (state: ICompanyProfile, action) => {
        state.is_busy = false;
        const newMemberData: ITeamMember = action.payload.data;
        state.memebers = state.memebers.map((member) => {
          return member.client_id === newMemberData.client_id
            ? newMemberData
            : member;
        });
        return state;
      },
    );

    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

export const { setGlobalPreferences } = ComapnyProfileSlice.actions;

export default ComapnyProfileSlice.reducer;
