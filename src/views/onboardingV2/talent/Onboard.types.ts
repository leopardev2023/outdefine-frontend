export type OnboardFeedType = {};

export type OnboardComponentProps = {
  goBack: () => void;
  goNext: () => void;
  feed?: OnboardFeedType;
};
