import Amplify, { Auth } from "aws-amplify";
import { useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppRoutes from "routes";
import { OnboardStatus } from "@types";

import { loadAuth, setAuthenication, logOut } from "redux/slices/authentication";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";

import stageUtils from "utils/stageUtils";
import { getItem } from "utils/storageUtils";

import "react-loading-skeleton/dist/skeleton.css";
import { mixpanel_identify } from "helpers/mixpanel";
import Page404 from "views/error-pages/Page404";
import { isProduction } from "helpers/env";

import { Helemt } from "react-helmet";

const awsconfig = stageUtils.getAWSConfig();
Amplify.configure(awsconfig);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isFetching,
    isAuthenticated,
  } = useAppSelector((state) => state.authentication);

  const email = getItem("email");
  const windowWithIntercom: any = window;

  useEffect(() => {
    const checkCurrentSession = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        dispatch(loadAuth());
      } catch {
        dispatch(setAuthenication(false));
        
        console.log("Clearing the session"+isAuthenticated);
        
        localStorage.clear();
        sessionStorage.clear();
        await Auth.signOut();
      }
    };
    checkCurrentSession();

    isProduction &&
      document.head.append(`<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "g0x436qzij");
  </script>`);
    return () => {
      //dispatch( logOut());
    };
  }, [dispatch]);

  useEffect(() => {
    // identify user on mixpanel on page reload
    if (email) {
      try {
        mixpanel_identify(email);
      } catch (err) {
        console.error("Mixpanel is not initiated yet");
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/404" element={<Page404 />} />
        <Route
          path="/*"
          element={
            <AppRoutes
              isLoading={isFetching}
              isAuthenticated={isAuthenticated || Boolean(email)}
            />
          }
        />
      </Routes>
      {isAuthenticated &&
        isProduction &&
        windowWithIntercom.Intercom("boot", {
          app_id: "ozwmn7yv",
          name: getItem("email"),
          email: getItem("email"),
          user_id: getItem("email"),
          vertical_padding: 40,
        })}
    </Router>
  );
};

export default App;
