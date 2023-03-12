import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { logOut } from "./authentication";

export type ClientOnboardState = {
  step: number;
  city: string;
  companyName: string;
  companyStage: number | undefined;
  companyWebsite: string;
  country: string;
  dialCode: IDialCodeObject | undefined;
  industry: number | undefined;
  numberOfEmployees: number | undefined;
  numberOfOpenRoles: number | undefined;
  phoneNumber: string;
  isRemoteFirst: boolean;
  firstName: string;
  lastName: string;
  companyEmail: string;
  position: string;
  isSampleAvatar: boolean;
  s3Avatar: string;
  sampleAvatar: {
    type: string;
    index: number;
  };
  termAgreement: boolean;
  termAuthorize: boolean;
  sampleBg: number;
  companyLogoFile: any;
  companyLogoPreviewImg: string;
  linkedin: string;
  twitter: string;
  instagram: string;
};

const initialState: ClientOnboardState = {
  step: 0,
  city: "",
  companyName: "",
  companyStage: undefined,
  companyWebsite: "",
  country: "",
  dialCode: undefined,
  industry: undefined,
  numberOfEmployees: undefined,
  numberOfOpenRoles: undefined,
  phoneNumber: "",
  isRemoteFirst: false,
  isSampleAvatar: false,
  s3Avatar: "",
  sampleAvatar: { type: "men", index: -1 },
  sampleBg: -1,
  firstName: "",
  lastName: "",
  companyEmail: "",
  position: "",
  termAgreement: false,
  termAuthorize: false,
  companyLogoFile: undefined,
  companyLogoPreviewImg: "",
  linkedin: "",
  twitter: "",
  instagram: "",
};

export const ClientOnboardSlice = createSlice({
  name: "clientOnboard",
  initialState,
  reducers: {
    goForward: (state) => {
      if (state.step > 3) return state;
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
  },
});

export const { goForward, goBackward, setOnboardFields } = ClientOnboardSlice.actions;

export default ClientOnboardSlice.reducer;
