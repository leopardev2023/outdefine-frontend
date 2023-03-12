import AuthenticatedLayout from "components/layout/Layout.Authenticated";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import pathUtils from "utils/pathUtils";
import clientPathUtils from "utils/path/client";
import { AppDispatch, RootState } from "app/store";
import ClientJobPosingOverviewPanel from "./../../views/application/jobs/componentsV2/Panel.ClientJobPostingOverview";

import { EngineerProfile, AssessmentV2, Tokens, Settings } from "views/application";

import Account from "views/application/account";
import Invoice from "views/application/invoice";

import ClientProfile from "views/client-application/profile";
import ClientTalentRoute from "./Route.Client.Talent";
import ClientAccount from "views/client-application/account";
import ClientInvoice from "views/client-application/invoice";
import ClientMyTeam from "views/client-application/myteam";
import ClientSettings from "views/client-application/settings";
import ClientDashboardV2 from "views/client-application/dashboard/ClientDashboardV2";
import DashboardV2 from "views/application/dashboard/DashboardV2";
import TalentJobV2 from "views/application/jobs/TalentJobV2";
import { getBalance, getReferrals } from "redux/slices/token";
import { useEffect } from "react";
import { getItem } from "utils/storageUtils";

const routes = [
  {
    path: pathUtils.SETTINGS,
    element: <Settings />,
  },
  {
    path: pathUtils.JOBS,
    element: <TalentJobV2 />,
  },
  {
    path: pathUtils.ENGINEER_PROFILE,
    element: <EngineerProfile />,
  },
  {
    path: pathUtils.DASHBOARD,
    element: <DashboardV2 />,
  },
  {
    path: pathUtils.ASSESSMENT,
    element: <AssessmentV2 />,
  },
  {
    path: pathUtils.ACCOUNT,
    element: <Account />,
  },
  {
    path: pathUtils.INVOICE,
    element: <Invoice />,
  },
  {
    path: pathUtils.TOKENS,
    element: <Tokens />,
  },
  {
    path: '/*',
    element: <Navigate to={pathUtils.DASHBOARD} replace />,
  },
];

const clientRoutes = [
  {
    path: clientPathUtils.CLIENT_DASHBOARD,
    element: <ClientDashboardV2 />,
  },
  {
    path: clientPathUtils.CLIENT_PROFILE,
    element: <ClientProfile />,
  },
  {
    path: clientPathUtils.CLIENT_TALENT,
    element: <ClientTalentRoute />,
  },
  {
    path: clientPathUtils.CLIENT_ACCOUNT,
    element: <ClientAccount />,
  },
  {
    path: clientPathUtils.CLIENT_INVOICE,
    element: <ClientInvoice />,
  },
  {
    path: clientPathUtils.CLIENT_MYTEAM,
    element: <ClientMyTeam />,
  },
  {
    path: '/*',
    element: <Navigate to={clientPathUtils.CLIENT_DASHBOARD} replace />,
  },
  {
    path: clientPathUtils.CLIENT_SETTINGS,
    element: <ClientSettings />,
  },
  {
    path: pathUtils.ENGINEER_PROFILE,
    element: <EngineerProfile />,
  },
  {
    path: clientPathUtils.CLIENT_JOBS_VIEW,
    element: <ClientJobPosingOverviewPanel />,
  },
];

const Application: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((root: RootState) => root.authentication.userId);
  const user_role = useSelector((root: RootState) => root.authentication.userRole) || getItem("userRole");
  useEffect(() => {
    dispatch(getBalance(Number(userId)));
  }, []);

  return (
    <AuthenticatedLayout>
      <Routes>
        {user_role === "Freelancer" &&
          routes.map((route, index) => <Route key={index} {...route} />)}

        {/* Client Side */}
        {user_role === "Client" &&
          clientRoutes.map((route, index) => <Route key={"client-route" + index} {...route} />)}

        {/*
          For now after checking session, it still remains as /login, so we can redirect to '/'
          or we can simply redirect to '/' here in app routes
        */}
        {/* <Route path="/login" element={<Navigate to="/" replace />} /> */}
        {/* <Route path="/client/onboard" element={<Navigate to="/" replace />} /> */}
        {/* <Route path="/talent/onboard" element={<Navigate to="/" replace />} /> */}
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </AuthenticatedLayout>
  );
};

export default Application;
