import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { logOut } from "./authentication";
import { getJobPostingByCompanyID } from "./companyJobs";

export const initialOffer = {
  application_id: Infinity,
  client_id: Infinity,
  company_id: Infinity,
  job_id: Infinity,
  freelancer_id: Infinity,
  experience_level: "",
  hourly_rate: "",
  location: "",
  pay_frequency: "",
  position: "",
  term: "",
  term_of_hours: 0,
  term_of_hours_duration: "",
  timezone: "",
  welcome_note: "We are so excited for you to join us!",
  primary_skills: "",
  secondary_skills: "",
  response_due: "",
  contract_start: "",
  contract_end: "",
  is_ongoing: false,
};

const initialState: ApplicationState = {
  invoice: {
    amount: 0,
    charges: "",
    company_id: 0,
    date_due: "",
    date_issued: "",
    freelancer_id: 0,
    other_charges: "",
    position: "",
    invoice_number: 0,
    invoice_type: "",
  },
  invoice_number: 0,
  draft_id: 0,
  teamMember: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    avatar: "",
  },
  client: {
    client_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    avatar: "",
  },
  offerList: [],
  declinedList: [],
  withdrawnList: [],
  jobTypes: {},
  selectedId: 0,
  createdOffer: initialOffer,
  actives: [],
  inActives: [],
};

export const ApplicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    updateInvoiceDetail: (state, action: PayloadAction<any>) => {
      state.invoice = { ...action.payload };
      return state;
    },
    updateInvoiceNumber: (state, action: PayloadAction<any>) => {
      state.invoice_number = action.payload;
      return state;
    },
    updateDraftId: (state, action: PayloadAction<any>) => {
      state.draft_id = action.payload;
      return state;
    },
    updateTeamMemberDetail: (state, action: PayloadAction<any>) => {
      state.teamMember = { ...action.payload };
      return state;
    },
    updateClientDetail: (state, action: PayloadAction<any>) => {
      state.client = { ...action.payload };
      return state;
    },
    updateOfferList: (state, action: PayloadAction<any>) => {
      state.offerList = action.payload;
      return state;
    },
    updateDeclinedList: (state, action: PayloadAction<any>) => {
      state.declinedList = action.payload;
      return state;
    },
    updateWithdrawnList: (state, action: PayloadAction<any>) => {
      state.withdrawnList = action.payload;
      return state;
    },
    updateJobTypes: (state, action: PayloadAction<any>) => {
      state.jobTypes = { ...action.payload };
      return state;
    },
    updateSelectedId: (state, action: PayloadAction<any>) => {
      state.selectedId = action.payload;
      return state;
    },
    updatedCreatedOffer: (state, action: PayloadAction<IOffer>) => {
      state.createdOffer = { ...action.payload };
      return state;
    },
    updateActives: (state, action: PayloadAction<any>) => {
      state.actives = action.payload;
      return state;
    },
    updateInActives: (state, action: PayloadAction<any>) => {
      state.inActives = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobPostingByCompanyID.fulfilled, (state, action) => {
      state.selectedId = action.payload?.length > 0 ? action.payload[0]?.id : -100;
      return state;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  updateInvoiceDetail,
  updateInvoiceNumber,
  updateDraftId,
  updateTeamMemberDetail,
  updateClientDetail,
  updateOfferList,
  updateDeclinedList,
  updateWithdrawnList,
  updateJobTypes,
  updateSelectedId,
  updatedCreatedOffer,
  updateActives,
  updateInActives,
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
