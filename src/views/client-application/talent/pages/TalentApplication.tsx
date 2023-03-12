import { ReactElement, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import TabV2 from "components/V2/Tab/TabV2";
import robotComputerImg from "assets/img/application/robotComputer.png";

import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";

import Applicants from "../pages/application/Applicants";
import applicationApi from "network/application";
import jobApi from "network/job";

import Interviewing from "../pages/application/Interviewing";
import Offers from "../pages/application/Offers";
import Declined from "../pages/application/Declined";
import Withdrawn from "../pages/application/Withdrawn";
import {
  updateOfferList,
  updateWithdrawnList,
  updateJobTypes,
  updateSelectedId,
} from "redux/slices/application";
import { RootState } from "app/store";
import IconV2 from "components/V2/Icons/IconV2";
import TalentInvitations from "./application/Invitations";
import { useSearchParams } from "react-router-dom";

const TalentApplication: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.companyprofile.id);

  const [selectedDp, setSelectedDp] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [appList, setAppList] = useState<Array<any>>([]);
  const [invitations, setInvitations] = useState<Array<any>>([]);

  const selectedID = useSelector((root: RootState) => root.application.selectedId);
  const jobs = useSelector((root: RootState) => root.companyjob.active);

  const [searchParam] = useSearchParams();

  const getTabIndex = (tab?: string | null) => {
    if (tab === undefined || tab === null) return 0;
    const tabIndexes = {
      applicants: 0,
      invited: 1,
      interviewing: 2,
      decline: 3,
      offers: 4,
      withdrawn: 5,
    };
    return tabIndexes[tab];
  };

  const formatOffers = (offers: any) => {
    const offerL: any = [];
    const withdrawnL: any = [];
    offers?.forEach((item: any) => {
      if (item?.offer_status === "OFFERED") {
        offerL.push(item);
      } else if (item?.offer_status === "DECLINED" || item?.offer_status === "WITHDRAWN") {
        withdrawnL.push(item);
      }
    });
    dispatch(updateOfferList(offerL));
    dispatch(updateWithdrawnList(withdrawnL));
  };

  const initJobType = (jobList: any) => {
    const jobTpes = {};
    jobList?.jobs.forEach((item: any) => {
      jobTpes[item?.job_id] = item?.PostedJobs?.job_title;
    });
    dispatch(updateJobTypes(jobTpes));
  };

  const init = async () => {
    if (companyId === undefined) return;
    try {
      setLoading(true);
      await Promise.all([
        jobApi.getAllAppliedJobsByCompanyId(companyId),
        jobApi.getInvitations("company", companyId),
        applicationApi.getOfferList("client", companyId),
      ]).then(([jobList, invitations, offers]) => {
        formatOffers(offers);
        initJobType(jobList);
        setSelectedDp(0);
        setAppList(jobList?.jobs);
        setInvitations(invitations.invitations);
      });
    } catch (err: any) {
      //Sentry.captureException(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, [companyId]);

  return (
    <main className="pt-[66px] w-full max-h-screen min-h-screen overflow-x-hidden">
      <div className="flex justify-between ml-40 mr-[187px] gap-x-10 mb-7">
        <div className="flex flex-col justify-between w-full pt-20">
          <h2 className="font-poppins font-bold text-xl mb-7">Applications</h2>
          <span className="">Choose one of your exisitng jobs to see the applicants</span>
          <DropdownV2
            icon={<IconV2 iconType="COMPANY" iconClassName="w-4 h-4" />}
            placeholder="Choose an acitve job post"
            data={
              jobs.length > 0
                ? jobs.map((job) => {
                    return {
                      id: job.id,
                      value: job.job_title,
                    };
                  })
                : [{ id: 0, value: loading ? "Loading..." : "No jobs" }]
            }
            selectedIndex={selectedDp}
            onChange={(idx: number) => {
              dispatch(updateSelectedId(jobs[idx].id));
              setSelectedDp(idx);
            }}
          />
        </div>
        <img alt="robotComputerImg" src={robotComputerImg} className="w-[228px] h-[228px] " />
      </div>
      <div className="ml-40 mr-[187px] gap-x-10 bg-background">
        <TabV2
          tabClass="w-[160px] h-11 font-poppins font-semibold text-xs"
          addClass="w-[880px]"
          tabs={["Applicants", "Invited", "Interviewing", "Declined", "Offers", "Withdrawn"]}
          contents={[
            <Applicants
              selectedId={selectedID}
              appList={appList}
              loading={loading}
              onRefetch={init}
            />,
            <TalentInvitations
              data={invitations.filter(
                (invitation) => invitation.job_id === selectedID && !invitation.is_declined,
              )}
              loading={loading}
              onRefetch={init}
            />,
            <Interviewing
              selectedId={selectedID}
              appList={appList}
              loading={loading}
              onRefetch={init}
            />,
            <Declined
              appList={[
                ...appList.filter(
                  (app) => app.job_id === selectedID && app.application_status === "REJECTED",
                ),
                ...invitations.filter(
                  (invitation) => invitation.job_id === selectedID && invitation.is_declined,
                ),
              ]}
              loading={loading}
            />,
            <Offers onRefetch={init} />,
            <Withdrawn />,
          ]}
          tabNavigations={[
            "applicants",
            "invited",
            "interviewing",
            "decline",
            "offers",
            "withdrawn",
          ]}
          initIndex={getTabIndex(searchParam.get("tab"))}
          contentWrapperClass="mt-10 mb-10 rounded-lg"
        />
      </div>
    </main>
  );
};

export default TalentApplication;
