import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// As a basic setup, import your same slice reducers
import authenticationSlice from "redux/slices/authentication";
import onboardSlice from "redux/slices/onboarding";
import ProfileSlice from "redux/slices/profile";
import assessmentSlice from "redux/slices/assessment";
import { OnboardStatus } from "@types";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    onboard: onboardSlice,
    assessment: assessmentSlice,
    profile: ProfileSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      authentication: {
        firstName: "",
        lastName: "",
        isFetching: false,
        isAuthenticated: false,
        userSub: "",
        userRole: "",
        userId: "",
        avatar: "",
        onboardStatus: OnboardStatus.TODO,
        onboardClientStatus: OnboardStatus.TODO,
        createdAt: "",
      },
      onboard: {
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
          jobs: [
            { id: 5, name: "Engineering" },
            { id: 6, name: "Design" },
            { id: 7, name: "Product" },
          ],
          roles: {
            5: [{ id: 23, name: "Frontend Engineer" }],
            6: [{ id: 30, name: "Product Designer" }],
            7: [{ id: 39, name: "Product Manager" }],
          },
          skills: {
            23: [{ id: 426, name: "React" }],
            30: [{ id: 595, name: "Prototyping" }],
            39: [{ id: 772, name: "Research" }],
          },
        },
        experienceYears: "1-3",
        experienceLevel: "Mid-level",
        hourlyRate: 40,
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
          name: "example",
          website: "example.com",
          industry: [{ id: 1, name: "Engineering" }],
          numberOfEmployees: [{ id: 1, name: "Engineering" }],
          companyStage: [{ id: 1, name: "Engineering" }],
          termOfOpenRoles: [{ id: 1, name: "Engineering" }],
          numberOfOpenRoles: [{ id: 1, name: "Engineering" }],
          headquartersCity: "New York",
          country: "United States",
        },
        companyV: {
          name: "example",
          website: "example.com",
          dialCode: "example",
          phoneNumber: "example.com",
          industry: "Engineering",
          numberOfEmployees: "Engineering",
          companyStage: "Engineering",
          numberOfOpenRoles: "Engineering",
          city: "New York",
          country: "United States",
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
          teamMemberEmails: [{ id: 1, name: "Engineering" }],
          role: [false, false, false],
        },
        serviceAgreement: {
          optAgree: false,
          optAuth: false,
        },
        companySocials: {
          linkedIn: "linkedin",
          twitter: "twitter",
          instagram: "instagram",
        },
        previewImage: "",
        previewLogo: "",
        companyLogoFile: "",
        clientLogoFile: "",
      },
      assessment: {
        role: {
          jobType: undefined,
          roleType: {},
          skills: [],
        },
        roles_skills: {
          jobs: [
            { id: 1, name: "Engineering" },
            { id: 2, name: "Design" },
            { id: 3, name: "Product" },
          ],
          roles: {
            1: [
              { id: 1, name: "Frontend Engineer" },
              { id: 2, name: "Backend Engineer" },
            ],
            2: [
              { id: 8, name: "Product Designer" },
              { id: 9, name: "UX Researcher" },
            ],
            3: [
              { id: 17, name: "Product Manager" },
              { id: 18, name: "Data analyst" },
            ],
          },
          skills: {
            1: [
              { id: 1, name: "React" },
              { id: 2, name: "Angular" },
            ],
          },
        },
        test_status: {
          engineer: false,
          design: false,
          product: false,
        },
        assessment_step: 0,
        hack_tests: [],
        cur_hack_test: null,
        vet_status: {
          id: 10,
          email: "alextan7527+9@gmail.com",
          assessment_passed: true,
          interview_passed: true,
          manually_passed: false,
          assessment_type: "RECORD",
          test_id: null,
          assessment_taken_count: 0,
          assessment_url: null,
          booking_uid: "",
          createdAt: "2022-09-12T23:54:52.686Z",
          updatedAt: "2022-09-13T17:58:50.478Z",
          HackerearthReport: null,
          HackerearthReportLog: [],
        },
        booking: {},
        confirmed: false,
      },
      profile: {
        is_busy: false,
        FreelancerProfileEducations: [],
        FreelancerProfileExperiences: [],
        FreelancerProfilePortfolios: [],
        FreelancerProfileSocialLink: {
          freelancer_id: 0,
        },
        Role: {
          name: "",
        },
        industry_id: -1,
        role: -1,
        User: {
          user_id: 0,
          email_id: "",
          is_deleted: false,
          referral_link: "",
          user_type: "CLIENT",
        },
        assessment_visibility: true,
        city: "",
        country: "",
        dial_code: "",
        phone_number: "",
        freelancer_id: 0,
        first_name: "",
        last_name: "",
        hourly_rate: 0,
        level_of_experience: "",
        primary_role: 0,
        job_type: 0,
        resume: "",
        roles_open_to: "",
        terms_open_to: "",
        skills: [],
        summary: "",
        years_of_experience: "",
        is_trusted_talent: null,
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        authentication: authenticationSlice,
        onboard: onboardSlice,
        assessment: assessmentSlice,
        profile: ProfileSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
