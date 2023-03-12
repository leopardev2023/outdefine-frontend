import Button from "components/Button/ButtonV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import { mixpanel_people_increment, mixpanel_track } from "helpers/mixpanel";
import { useEffect } from "react";

const Page500 = ({ error, resetErrorBoundary }) => {
  useEffect(() => {
    mixpanel_people_increment({ number_of_crash: 1 });
    mixpanel_track("Website crashed");
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <BadgeV2 color="pink" addClass="h-[30px] px-[10px]">
        Thats an error
      </BadgeV2>
      <h1 className="text-[64px] font-poppins font-bold text-odf mt-2">Oh No! Error 500</h1>
      <img src="/app/common/spaceboy/astro-app-crash.png" alt="app-crashed" />
      <p className="text-odf text-xs font-inter leading-6 max-w-[590px] text-center">
        The server encountered an error and can not complete your request. If the error continues
        please contact our support team{" "}
        <a
          href="mailto:support@outdefine.com"
          className="font-inter font-bold decoration-theme underline"
        >
          support@outdefine.com
        </a>
      </p>
      <a href="/dashboard">
        <Button className="mt-10 font-poppins text-sm text-white px-3 py-2">
          Return to homepage
        </Button>
      </a>
    </div>
  );
};

export default Page500;
