import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./../redux/hooks/redux-hooks";
import { mixpanel_track } from "./../helpers/mixpanel";
import { logOut as lOut } from "redux/slices/authentication";

/**
 * This Hook can be used for safely logging out
 */
function useLogOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function logOut() {
    mixpanel_track("Log out");
    const windowWithIntercom: any = window;
    windowWithIntercom.Intercom("shutdown");
    await dispatch(lOut());
    navigate("/");
  }
  return logOut;
}

export default useLogOut;
