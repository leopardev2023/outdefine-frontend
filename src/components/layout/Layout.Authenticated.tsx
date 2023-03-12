import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getTalentProfile } from "redux/slices/profile";
import { getProtoTypes } from "redux/slices/prototype";
import { getCompanyProfile, getTeamMembers } from "redux/slices/companyProfile";
import { getJobPostingByCompanyID } from "redux/slices/companyJobs";
import SidebarV2 from "components/sidebar";

const AuthenticatedLayout = ({ children }: any) => {
  const { userRole, userId } = useSelector(
    (root: RootState) => root.authentication,
  );
  const company_id = useSelector((root: RootState) => root.companyprofile.id);

  const path = useLocation().pathname;
  const dispatch = useDispatch<AppDispatch>();

  const initFetch = async (userRole: string) => {
    dispatch(getProtoTypes());
    if (userRole === "Freelancer" && !!userId) {
      dispatch(getTalentProfile());
      return;
    }

    if (userRole === "Client" && !!userId) {
      dispatch(getCompanyProfile(parseInt(userId)));
    }
  };

  useEffect(() => {
    initFetch(userRole);
  }, [userRole, userId]);

  useEffect(() => {
    company_id !== undefined &&
      dispatch(getJobPostingByCompanyID(Number(company_id)));
    company_id !== undefined && dispatch(getTeamMembers(company_id));
  }, [company_id]);

  return path.includes("hackerearth") || path.includes("confirminter")
    ? (
    <>{children}</>
      )
    : (
    <div className='flex bg-background h-screen items-start font-inter'>
      <SidebarV2 />
      {children}
    </div>
      );
};

export default AuthenticatedLayout;
