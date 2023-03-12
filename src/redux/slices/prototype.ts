import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import onboardAPI from "network/onboarding";
import profileAPI from "network/profile";
import { logOut } from "./authentication";

interface SkillType {
  id: number;
  name: string;
}

export interface RoleType {
  role_id: number;
  id: number;
  name: string;
  skills: Array<SkillType>;
  jobTypeJobTypeId: number;
}

interface RoleWithoutSkillsType {
  id: number;
  name: string;
}

export interface JobType {
  job_type_id: number;
  active?: boolean;
  name: string;
  roles: Array<RoleType>;
}

export interface SkillFullType {
  id: number;
  name: string;
  role_id: number;
}

export interface JobPropsType {
  data: Array<JobType>;
  roles: Array<RoleType>;
  skills: Array<SkillFullType>;
}

export const getProtoTypes = createAsyncThunk("getProtoTypes", async () => {
  const proto = await onboardAPI.getRolesSkills();
  const skills = await profileAPI.getAllSkills();
  return { proto, skills };
});

const initialState: JobPropsType = {
  data: [],
  roles: [],
  skills: [],
};

export const PrototypeSlice = createSlice({
  name: "prototype",
  initialState,
  reducers: {
    authenticationCheckSuccess: (state, action: PayloadAction<any>) => {},
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getProtoTypes.fulfilled, (state, action) => {
      const _roles = action.payload.proto
        .map((_proto) =>
          _proto.roles.map((role) => {
            return {
              id: role.role_id,
              name: role.name,
              skills: role.skills,
            };
          }),
        )
        .flat();
      state.data = action.payload.proto;
      state.roles = _roles;
      state.skills = action.payload.skills.all;
      // Add user to the state array
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state = initialState;
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = PrototypeSlice.actions;

export default PrototypeSlice.reducer;
