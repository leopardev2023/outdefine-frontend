import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from 'app/store';
import { setTalentProfileData } from 'redux/slices/profile';

import applicationApi from 'network/application';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function useTalentProfile() {
  const path = useLocation().pathname;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const goToTalentProfile = async (id: number | string) => {
    if (!id) return;

    try {
      setLoading(true);
      await Promise.all([applicationApi.getTalent(id)])
        .then(([talentList]) => {
          dispatch(setTalentProfileData(talentList));
        })
        .then(() => {
          navigate('/profile/' + id, { state: path });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err: any) {
      //Sentry.captureException(err);
      //setLoading(false);
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
    }
  };

  return { loading, goToTalentProfile };
}
