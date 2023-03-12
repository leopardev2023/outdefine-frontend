import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { OnboardStatus } from "@types";
import { logOut } from "./authentication";

const initialState: OnboardState = {
  name: {
    firstName: "",
    lastName: "",
    dialCode: "",
    phoneNumber: "",
  },
  role: {
    jobType: -1,
    roleType: -1,
    preSkills: [],
    secSkills: [],
  },
  roles_skills: {
    jobs: [],
    roles: {},
    skills: {},
  },
  experienceYears: "",
  experienceLevel: "",
  hourlyRate: 0,
  rateCurrency: "USD",
  location: {
    country: "",
    city: "",
  },
  english: "",
  socials: {
    portfolio: "",
    github: "",
    linkedin: "",
  },
  coverImage: "",
  supportingImages: [],
  onboardStatus: OnboardStatus.TODO,
  company: {
    name: "",
    website: "",
    industry: {},
    numberOfEmployees: {},
    companyStage: {},
    termOfOpenRoles: [],
    numberOfOpenRoles: {},
    headquartersCity: "",
    country: "",
  },
  companyV: {
    name: "",
    website: "",
    dialCode: "United States +1",
    phoneNumber: "",
    industry: "",
    numberOfEmployees: "",
    companyStage: "",
    numberOfOpenRoles: "",
    city: "",
    country: "",
    remoteFlag: false,
  },
  employee: {
    firstName: "",
    lastName: "",
    jobPosition: "",
    jobEmail: "",
    avatar: "",
    avatarNumber: 0,
    bannerNumber: 0,
    checkCustomAvatar: false,
    pronoun: false,
  },
  inviteTeam: {
    teamMemberEmails: [],
    role: [],
  },
  serviceAgreement: {
    optAgree: false,
    optAuth: false,
  },
  companySocials: {
    linkedIn: "",
    twitter: "",
    instagram: "",
  },
  previewImage: "",
  previewLogo: "",
  companyLogoFile: "",
  clientLogoFile: "",
};

export const OnboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    /**
     * First Onboarding Step
     */
    updateName: (state, action: PayloadAction<any>) => {
      const { firstName, lastName, dialCode, phoneNumber } = action.payload;
      state.name = { firstName, lastName, dialCode, phoneNumber };
      return state;
    },
    updateRole: (state, action: PayloadAction<any>) => {
      state.role = { ...action.payload };
      return state;
    },
    updateRolesSkills: (state, action: PayloadAction<any>) => {
      state.roles_skills = { ...action.payload };
      return state;
    },
    /**
     * Second Onboarding Step
     */
    updateExperienceYear: (state, action: PayloadAction<any>) => {
      state.experienceYears = action.payload;
      return state;
    },
    updateExperienceLevel: (state, action: PayloadAction<any>) => {
      state.experienceLevel = action.payload;
      return state;
    },
    updateHourlyRate: (state, action: PayloadAction<any>) => {
      state.hourlyRate = action.payload;
      return state;
    },
    updateCurrency: (state, action: PayloadAction<any>) => {
      state.rateCurrency = action.payload;
    },
    /**
     * Third Onboarding Step
     */
    updateLocation: (state, action: PayloadAction<any>) => {
      state.location = { ...action.payload };
      return state;
    },
    updateEnglish: (state, action: PayloadAction<any>) => {
      state.english = action.payload;
      return state;
    },
    /**
     * Fourth Onboarding Step
     */
    updateSocials: (state, action: PayloadAction<any>) => {
      state.socials = { ...action.payload };
      return state;
    },
    updateCoverImage: (state, action: PayloadAction<any>) => {
      state.coverImage = action.payload;
      return state;
    },
    updateSupportingImages: (state, action: PayloadAction<any>) => {
      state.supportingImages = [...action.payload];
      return state;
    },
    /**
     * client onboarding
     */
    /**
     * step1
     */
    updateCompany: (state, action: PayloadAction<any>) => {
      const {
        name,
        website,
        industry,
        numberOfEmployees,
        companyStage,
        termOfOpenRoles,
        numberOfOpenRoles,
        headquartersCity,
        country,
      } = action.payload;
      state.company = {
        name,
        website,
        industry,
        numberOfEmployees,
        companyStage,
        termOfOpenRoles,
        numberOfOpenRoles,
        headquartersCity,
        country,
      };
      return state;
    },

    updateCompanyV: (state, action: PayloadAction<any>) => {
      const {
        name,
        website,
        dialCode,
        phoneNumber,
        industry,
        numberOfEmployees,
        companyStage,
        numberOfOpenRoles,
        city,
        country,
        remoteFlag,
      } = action.payload;

      state.companyV = {
        name,
        website,
        dialCode,
        phoneNumber,
        industry,
        numberOfEmployees,
        companyStage,
        numberOfOpenRoles,
        city,
        country,
        remoteFlag,
      };
      return state;
    },

    /**
     * step2
     */
    updateEmployee: (state, action: PayloadAction<any>) => {
      state.employee = { ...action.payload };
      return state;
    },

    /**
     * step3
     */
    updateInvitationTeam: (state, action: PayloadAction<any>) => {
      state.inviteTeam = { ...action.payload };
      return state;
    },

    /**
     * step4
     */
    updateSeviceAgreement: (state, action: PayloadAction<any>) => {
      state.serviceAgreement = { ...action.payload };
      return state;
    },
    /**
     * step5
     */
    updateCompanySocials: (state, action: PayloadAction<any>) => {
      state.companySocials = { ...action.payload };
      return state;
    },

    /**
     * step2 upload photo
     */
    updatePreviewImage: (state, action: PayloadAction<any>) => {
      state.previewImage = { ...action.payload };
      return state;
    },
    /**
     * step5 upload logo
     */
    updatePreviewLogo: (state, action: PayloadAction<any>) => {
      state.previewLogo = { ...action.payload };
      return state;
    },

    updateCompanyLogoFile: (state, action: PayloadAction<any>) => {
      state.companyLogoFile = action.payload;
      return state;
    },

    updateClientLogoFile: (state, action: PayloadAction<any>) => {
      state.clientLogoFile = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  updateName,
  updateEnglish,
  updateExperienceYear,
  updateExperienceLevel,
  updateHourlyRate,
  updateCurrency,
  updateLocation,
  updateRole,
  updateRolesSkills,
  updateSocials,
  updateCoverImage,
  updateSupportingImages,
  updateCompany,
  updateCompanyV,
  updateEmployee,
  updateInvitationTeam,
  updateSeviceAgreement,
  updateCompanySocials,
  updatePreviewImage,
  updatePreviewLogo,
  updateCompanyLogoFile,
  updateClientLogoFile,
} = OnboardSlice.actions;

export default OnboardSlice.reducer;
