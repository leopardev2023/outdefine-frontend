export type OnboardFeedType = {
  user: any;
  msa: any;
  companyLists: any;
};

export type OnboardComponentProps = {
  goBack: () => void;
  goNext: () => void;
  feed?: OnboardFeedType;
};
