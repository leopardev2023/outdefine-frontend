export enum JOBTYPE {
  ENGINEER,
  DESIGN,
  PRODUCT,
}
export interface AssessmentState {
  role: {
    jobType: any;
    roleType: any;
    skills: Array<any>;
  };
  roles_skills: {
    jobs: Array<{ id: number; name: string }>;
    roles: Record<any, any>;
    skills: Record<any, any>;
  };
  test_status: {
    engineer: boolean;
    design: boolean;
    product: boolean;
  };
  assessment_step: number;
  hack_tests: Array<any>;
  cur_hack_test: any;
  vet_status: any;
  booking: any;
  confirmed: boolean;
}
