import { ReactElement } from "react";
import TripleInfoWithIconsV2 from "./Bar.TripleInfoWithIconsV2";

interface ITripleInfoWithBadges extends IInfoBarV2 {
    badges?: JSX.Element[];
}

const TripleInfoWithBadges = (props: ITripleInfoWithBadges): ReactElement => {
  const { badges } = props;
  const firstExtra = badges ? badges[0] : undefined;
  const restExtra = badges ? badges.slice(1) : [];

  return (
    <div className="mt-4 w-full flex flex-col-reverse gap-4 lg:gap-2 lg:flex-row lg:justify-between">
      <TripleInfoWithIconsV2 {...props } />

      <div className="relative">
        {firstExtra}
        <div className="lg:absolute top-[20px] flex flex-col gap-2 mt-[10px]">
          {restExtra}
        </div>
      </div>

    </div>
  );
};

export default TripleInfoWithBadges;
