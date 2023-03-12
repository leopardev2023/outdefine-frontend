import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import jobAPI from 'network/job';
import { logOut } from './authentication';

const initialState: ICompanyJob = {
  busy: false,
  success: true,
  notactive: [],
  drafts: [],
  active: [],
  filled: [],
};

export const doJobPosting = createAsyncThunk(
  'postAJob',
  async (arg: IJobPostingV2) => {
    const result = await jobAPI.postAJob(arg);
    return result;
  }
);

export const getJobPostingByCompanyID = createAsyncThunk(
  'getAJobPostingByCompanyID',
  async (id: number) => {
    const result = await jobAPI.getAllJobPostsByCompanyID(id);
    return result.data;
  }
);

export const updateJobPosting = createAsyncThunk(
  'updateJobPosting',
  async (data: IJobPostingV2) => {
    const result = await jobAPI.updateJobPostingByID(data);
    return result;
  }
);

export const removeJobPosting = createAsyncThunk(
  'removeJobPosting',
  async ({ id, company_id }: { id: number; company_id: number }) => {
    const result = await jobAPI.removeJobPostingByID(id, company_id);
    return result;
  }
);

export const ComapnyJobSlice = createSlice({
  name: 'clientJobs',
  initialState,
  reducers: {
    setActiveJobs: (state: ICompanyJob, action: PayloadAction<any>) => {},
    setInactiveJobs: (
      state: ICompanyJob,
      action: PayloadAction<Array<any>>
    ) => {
      state.notactive = action.payload;
      return state;
    },
    addInactiveJobs: (state: ICompanyJob, action: PayloadAction<any>) => {
      state.notactive = [...state.notactive, action.payload];
      return state;
    },
    setDrafts: (state: ICompanyJob, action: PayloadAction<any>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(doJobPosting.pending, (state: ICompanyJob) => {
      state.busy = true;
      return state;
    });

    builder.addCase(doJobPosting.rejected, (state: ICompanyJob) => {
      state.busy = false;
      state.success = false;
      return state;
    });

    builder.addCase(doJobPosting.fulfilled, (state: ICompanyJob, action) => {
      if (action.payload.success) {
        state.active = [...action.payload.data];
      }
      state.busy = false;

      return state;
    });

    builder.addCase(getJobPostingByCompanyID.pending, (state) => {
      state.busy = true;
      return state;
    });

    builder.addCase(getJobPostingByCompanyID.rejected, (state) => {
      state.busy = false;
      return state;
    });

    builder.addCase(
      getJobPostingByCompanyID.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.active = [...action.payload];
        state.busy = false;
        return state;
      }
    );

    builder.addCase(updateJobPosting.pending, (state: ICompanyJob) => {
      state.busy = true;
      return state;
    });
    builder.addCase(updateJobPosting.rejected, (state: ICompanyJob) => {
      state.busy = false;
      state.success = false;
      return state;
    });

    builder.addCase(
      updateJobPosting.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload?.success) {
          state.success = true;
          state.active = [...action.payload.data];
        }
        state.busy = false;
        return state;
      }
    );

    builder.addCase(removeJobPosting.pending, (state: ICompanyJob) => {
      state.busy = true;
      return state;
    });
    builder.addCase(removeJobPosting.rejected, (state: ICompanyJob) => {
      state.busy = false;
      state.success = false;
      return state;
    });
    builder.addCase(
      removeJobPosting.fulfilled,
      (state: ICompanyJob, action) => {
        if (action.payload.success) {
          state.active = [...action.payload.data];
          state.success = true;
        }
        state.busy = false;
        return state;
      }
    );
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

export const { setActiveJobs, setInactiveJobs, setDrafts, addInactiveJobs } =
  ComapnyJobSlice.actions;

export default ComapnyJobSlice.reducer;
