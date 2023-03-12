import { RootState } from "app/store";
import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function AssessmentTip(): ReactElement {
  const vetted = useSelector((root: RootState) => root.profile.is_trusted_talent === "TRUSTED");
  const ref = useRef<HTMLDivElement>(null);
  const [bgHeight, setBhHeight] = useState<number>(0);

  // Calculate the size the star background should have
  useEffect(() => {
    const updateBgHeight = () => {
      setBhHeight(ref.current?.clientHeight || 0);
    };
    // onMount
    setBhHeight(ref.current?.clientHeight || 100);
    window.addEventListener("resize", updateBgHeight);
    return () => window.removeEventListener("resize", updateBgHeight);
  }, []);

  if (vetted) return <></>;

  return (
    <div
      className={`bg-orange/75 min-h-fit w-full rounded-lg p-[10px_16px_10px_10px] flex flex-col md:flex-row gap-6 mt-8`}
    >
      <div
        className={`image group md:w-[148px] md:min-w-[148px] rounded
       zero:max-md:!min-h-[86px] zero:max-md:!h-[86px] w-full overflow-hidden relative flex`}
        style={{ height: bgHeight }}
      >
        <img
          src="/app/common/spaceboy/astro-computer.png"
          className="h-[86px] md:h-[80%] self-center ml-auto mr-auto md:self-end md:justify-self-end z-[1]"
        />
        <img src="/app/common/bg.png" className="w-full absolute top-0 left-0" />
      </div>
      <div className="pt-3 flex flex-col h-fit pb-[10px]" ref={ref}>
        <h4 className="font-poppins font-bold text-base leading-6">Complete Assessment</h4>
        <p className="mt-4 font-inter text-xs">
          You are able to save jobs for later, but you cannot apply until your assessments are
          completed. Companies can still reach out and invite you to apply for jobs. Earn{" "}
          <IconV2 iconType="TOKEN" iconClassName="w-5 h-5 inline" />
          500 tokens when you become a trusted member and can use tokens to boost your job
          application. Visit the assessment page to complete trusted member process.
        </p>
        <NavLink className={"mt-[20px] ml-auto block"} to="/assessments">
          <Button>Assessments</Button>
        </NavLink>
      </div>
    </div>
  );
}
