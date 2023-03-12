export interface TokenState {
  is_busy: boolean;
  balance: number;
  rewardsHistory: Array<any>;
  referralsHistory: Array<ITalentReferralsHistory>;
  aggregatedRewardsHistory: Array<any>;
}

interface ITalentReferralsHistory {
  id: number;
  user_id: number;
  email: string;
  referral_code: string;
  referralHistory: Array<IReferralHistory>;
}

interface IReferralHistory {
  id: number;
  user_id: number;
  email: string;
  referral_id: number;
  referral_status: any;
  users: any;
  referralSentAt: Date;
  joinedAt: Date;
}
