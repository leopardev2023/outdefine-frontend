import { isProduction } from "helpers/env";
import { Routes, Route, Navigate } from "react-router-dom";
import pathUtils from "utils/pathUtils";
import React from "react";
import {
  Login,
  Signup,
  ConfirmUser,
  ForgotPassword,
  ResetPassword,
  Test,
} from "views/authentication";
import ComponentRoutes from "./Route.Components";

const routes = [
  {
    path: pathUtils.SIGN_IN,
    element: <Login />,
  },
  {
    path: pathUtils.SIGN_UP,
    element: <Signup />,
  },
  {
    path: pathUtils.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: pathUtils.CONFIRM_USER,
    element: <ConfirmUser />,
  },
  {
    path: pathUtils.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: pathUtils.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" replace />,
  },
];

const componentRoute = {
  path: "/components/*",
  element: <ComponentRoutes />,
};


const Authentication: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
      {isProduction ? <></> : <Route {...componentRoute} />}
    </Routes>
  );
};

export default Authentication;
