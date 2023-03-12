interface AuthState {
  firstName: string;
  lastName: string;
  isFetching: boolean;
  isAuthenticated: boolean;
  userSub: string;
  userRole: string;
  userId: string;
  avatar: string;
  onboardStatus: OnboardStatus;
  onboardClientStatus: OnboardStatus;
  accountType?: SignupAccount;
  createdAt: string;
}
