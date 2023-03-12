import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

export default function useJobs() {
  const jobs = useSelector((root: RootState) => root.companyjob.active);

  return { jobs };
}
