import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import OnboardingAPI from "network/onboarding";
import utils from "utils/utils";

// import API
import jobAPI from "network/job";
import { logOut } from "./authentication";

export const TYPE_ALL = "View all";
export const TYPE_RECOMMENDED = "Recommended by you";
export const TYPE_RECENT = "Newest";

const initialState: JobStateType = {
  type: TYPE_ALL,
  loading: false,
  query: {
    skip: 0,
    limit: 200,
    job_title: "",
    location: [],
    hourly_min_rate: 0,
    hourly_max_rate: 200,
    term: [],
    skills: [],
    filter_changed: false,
    experience_level: [],
    timezone: [],
    visa_sponsor: [],
    industry: [],
  },
  posts: [],
  saved_jobs: [],
  applied_jobs: [],
  invitations: [],
  one_page_info: {
    jobID: Infinity,
    isApplied: false,
    isSaved: false,
    isAccepted: false,
  },
};

const makeQueryFromArgs = (arg: JobFilterType) => {
  const { job_title, term, location, timezone, experience_level, visa_sponsor } = arg;
  const str_terms =
    term.length !== 0 ? term?.map((elem: IData) => elem?.value).join(",") : undefined;
  const str_location =
    location.length !== 0 ? location?.map((elem: IData) => elem?.value).join(",") : undefined;
  const str_timezone =
    timezone.length !== 0 ? timezone?.map((elem: IData) => elem?.value).join(",") : undefined;
  const str_experience_level =
    experience_level.length !== 0
      ? experience_level?.map((elem: IData) => elem?.value).join(",")
      : undefined;
  const str_visa_sponsor =
    visa_sponsor.length === 0 ? undefined : visa_sponsor[0]?.value === "None" ? "false" : "true";

  return {
    ...arg,
    terms: str_terms,
    location: str_location,
    timezone: str_timezone,
    experience_level: str_experience_level,
    visa_sponsor: str_visa_sponsor,
    query: job_title === "" ? undefined : job_title.toLowerCase(),
  };
};

export const getRecommendedPostsAction = createAsyncThunk(
  "getRecommendedJobs",
  async (arg: any) => {
    console.log("job slice getting recommended jobs", makeQueryFromArgs(arg.query));
    const profile = await OnboardingAPI.getFreelancerProfile(arg.userId).then((response) =>
      utils.filterProfileAttrs(response.data),
    );
    const res = await jobAPI.getRecommendedJobs(profile, makeQueryFromArgs(arg.query));
    return res;
  },
);

export const getAllJobPosts = createAsyncThunk("getAllJobPosts", async (arg: JobFilterType) => {
  const res = await jobAPI.getAllJobPosts(makeQueryFromArgs(arg));
  return res;
});

export const getMoreJobPosts = createAsyncThunk("getMoreJobPosts", async (arg: JobFilterType) => {
  let res: any;
  if (arg?.type === TYPE_ALL) {
    res = await jobAPI.getAllJobPosts(makeQueryFromArgs(arg));
    return { result: res, filter_changed: arg.filter_changed };
  }

  res = await jobAPI.getRecommendedJobs(null, makeQueryFromArgs(arg));
  return { result: res, filter_changed: arg.filter_changed };
});

export const getAllSavedJobs = createAsyncThunk(
  "getAllSavedJobs",
  async (freelancer_id: number | string) => {
    const res = await jobAPI.getAllSavedJobs(freelancer_id);
    return res;
  },
);

export const getAllAppliedJobs = createAsyncThunk(
  "getAllAppliedJobs",
  async (freelancer_id: number | string) => {
    const res = await jobAPI.getAllAppliedJobs(freelancer_id);
    return res;
  },
);

export const getInvitations = createAsyncThunk(
  "getInvitations",
  async (freelancer_id: number | string) => {
    const res = await jobAPI.getInvitations("freelancer", freelancer_id);
    return res;
  },
);

export const doApplyForAJobAction = createAsyncThunk(
  "doApplyForAJobAction",
  async ({ freelancer_id, job_id, company_id, cover_letter, token_amount }: IApplyJobParam) => {
    const result = await jobAPI.applyForAJob(
      freelancer_id,
      job_id,
      company_id,
      cover_letter,
      token_amount,
    );
    return result;
  },
);

export const doSaveAJobAction = createAsyncThunk(
  "doSaveAJob",
  async ({ freelancer_id, job_id }: { freelancer_id: number; job_id: number }) => {
    const result = await jobAPI.saveOrUnsaveAJob(freelancer_id, job_id);
    return result;
  },
);

export const declineInvitationAction = createAsyncThunk(
  "declineInvitation",
  async ({ application_id, freelancer_id }: { application_id: number; freelancer_id: number }) => {
    const result = await jobAPI.declineInvitation(application_id, freelancer_id);
    return result;
  },
);

export const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobSearchFilter: (state, action: PayloadAction<JobFilterType>) => {
      state.query = { ...action.payload, filter_changed: true };
      return state;
    },
    setJobState: (state, action: PayloadAction<JobStateType>) => {
      state = { ...action.payload };
      return state;
    },
    setFilterQuery: (state: JobStateType, action) => {
      state.query = {
        ...state.query,
        [action.payload.name]: action.payload.value,
      };
      return state;
    },
    setRateInFilterQuery: (state: JobStateType, action) => {
      state.query = {
        ...state.query,
        hourly_max_rate: action.payload.max,
        hourly_min_rate: action.payload.min,
      };
      return state;
    },
    setOnePageInfo: (state: JobStateType, action: PayloadAction<TOnePageInfo>) => {
      state.one_page_info = {
        ...action.payload,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecommendedPostsAction.pending, (state, action) => {
      state.loading = true;
      state.action = "FETCH";
      return state;
    });

    builder.addCase(getRecommendedPostsAction.fulfilled, (state, action) => {
      if (action.payload.status === 500) {
        return;
      }
      const _posts = action.payload.jobs === false ? [] : getArrayFromString(action.payload.jobs);
      state.posts = _posts;
      state.query.filter_changed = false;
      state.loading = false;
      return state;
    });

    builder.addCase(getRecommendedPostsAction.rejected, (state, action) => {
      state.loading = false;
      // console.log('rejected', action.payload);
      return state;
    });

    builder.addCase(getAllJobPosts.pending, (state, action) => {
      state.loading = true;
      state.action = "FETCH";
      return state;
    });

    builder.addCase(getAllJobPosts.fulfilled, (state, action) => {
      if (action.payload.status === 500) {
        return;
      }
      const _posts = action.payload.jobs === false ? [] : getArrayFromString(action.payload.jobs);
      state.posts = _posts;
      state.query.filter_changed = false;
      state.loading = false;
      return state;
    });

    builder.addCase(getMoreJobPosts.pending, (state, action) => {
      state.loading = true;
      return state;
    });

    builder.addCase(getMoreJobPosts.fulfilled, (state, action) => {
      if (action.payload.filter_changed) {
        state.posts = getArrayFromString(action.payload.result.jobs);
        state.query.filter_changed = false;
        state.loading = false;
      } else {
        state.posts = [...state.posts, ...getArrayFromString(action.payload.result.jobs)];
        state.loading = false;
      }
      return state;
    });

    builder
      .addCase(getInvitations.pending, (state) => {
        state.loading = true;
        return state;
      })
      .addCase(getInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload.invitations;
        state.loading = false;
        return state;
      })
      .addCase(getInvitations.rejected, (state, action) => {
        state.loading = false;
        return state;
      });

    builder
      .addCase(getAllSavedJobs.pending, (state) => {
        state.loading = true;
        state.action = "FETCH SAVED JOBS";
        return state;
      })
      .addCase(getAllSavedJobs.fulfilled, (state, action) => {
        const _saved_jobs = action.payload.jobs.map((_job) => {
          return {
            ..._job,
            PostedJobs: getArrayFromStringForAppended(_job.PostedJobs),
          };
        });
        state.saved_jobs = _saved_jobs;
        state.loading = false;
      })
      .addCase(getAllSavedJobs.rejected, (state) => {
        state.loading = false;
        return state;
      });

    builder
      .addCase(getAllAppliedJobs.pending, (state) => {
        state.loading = true;
        state.action = "FETCH APPLICATION";
        return state;
      })
      .addCase(getAllAppliedJobs.fulfilled, (state, action) => {
        const _applied_jobs = action.payload.jobs.map((_job) => {
          return {
            ..._job,
            PostedJobs: getArrayFromStringForAppended(_job.PostedJobs),
          };
        });
        state.applied_jobs = _applied_jobs;
        state.loading = false;
        return state;
      })
      .addCase(getAllAppliedJobs.rejected, (state) => {
        state.loading = false;
        return state;
      });

    builder
      .addCase(doApplyForAJobAction.pending, (state, action) => {
        state.loading = true;
        state.action = "APPLY";
        return state;
      })
      .addCase(doApplyForAJobAction.fulfilled, (state, action) => {
        state.loading = false;
        return state;
      })
      .addCase(doApplyForAJobAction.rejected, (state, action) => {
        state.loading = false;
        return state;
      });

    builder
      .addCase(doSaveAJobAction.pending, (state, action) => {
        state.loading = true;
        state.action = "SAVE";
        return state;
      })
      .addCase(doSaveAJobAction.fulfilled, (state, action) => {
        state.loading = false;
        return state;
      })
      .addCase(doSaveAJobAction.rejected, (state, action) => {
        state.loading = false;
        return state;
      });

    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

const getArrayFromString = (jobs) => {
  const _posts = jobs.map((job) => {
    return {
      ...job,
      primary_skills: Array.isArray(job.primary_skills)
        ? job.primary_skills
        : job.primary_skills
            .slice(1, job.primary_skills.length - 1)
            .split(",")
            .map((_str) => parseInt(_str.replaceAll('"', ""))),
    };
  });
  return _posts;
};

const getArrayFromStringForAppended = (job) => {
  return {
    ...job,
    primary_skills: Array.isArray(job.primary_skills)
      ? job.primary_skills
      : job.primary_skills
          .slice(1, job.primary_skills.length - 1)
          .split(",")
          .map((_str) => parseInt(_str.replaceAll('"', ""))),
  };
};

// Action creators are generated for each case reducer function
export const {
  setJobSearchFilter,
  setRateInFilterQuery,
  setJobState,
  setFilterQuery,
  setOnePageInfo,
} = JobSlice.actions;

export default JobSlice.reducer;
