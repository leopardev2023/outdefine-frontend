import { ReactElement, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";

import TabV2 from "components/V2/Tab/TabV2";
import robotWeightLiftingImg from "assets/img/application/robotWeightLifting.png";
import applicationApi from "network/application";

import Active from "./management/Active";
import Inactive from "./management/Inactive";

import { updateActives, updateInActives } from "redux/slices/application";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const TalentManagement: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.companyprofile.id);
  const [loading, setLoading] = useState<boolean>(true);

  const init = async () => {
    if (companyId === undefined) return;
    try {
      setLoading(true);
      const result = await applicationApi.getTalentsFromCompanyID(companyId);
      dispatch(updateActives(result?.actives));
      dispatch(updateInActives(result?.inactives));
      setLoading(false);
    } catch (err: any) {
      //Sentry.captureException(err);
      setLoading(false);
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
    }
  };

  useEffect(() => {
    init();
  }, [companyId]);

  return (
    <main className="pt-[66px] w-full max-h-screen overflow-x-hidden">
      <div className="flex justify-between mx-40 gap-x-10 mb-7">
        <div className="w-full pt-20">
          <div className="flex flex-row justify-between relative mb-14">
            <h2 className="font-poppins font-bold text-xl">Manage talent</h2>
            <img
              alt="robotWeightLiftingImg"
              src={robotWeightLiftingImg}
              className="w-[228px] h-[228px] absolute right-0 -top-10"
            />
          </div>
          <TabV2
            tabClass="w-[100px] h-11 font-poppins font-semibold text-xs"
            tabs={["Active", "Inactive"]}
            contents={[
              <Active loading={loading} onRefetch={init} />,
              <Inactive loading={loading} />,
            ]}
            contentWrapperClass="mb-10 rounded-lg"
          />
        </div>
      </div>
    </main>
  );
};

export default TalentManagement;
