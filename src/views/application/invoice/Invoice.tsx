import { useEffect, useState } from 'react';
import Wrapper from './components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';

import LoadingScreen from 'components/LoadingScreen';
import List from './section/List';
import Create from './section/Create';
import Edit from './section/Edit';
import NewVoice from './section/NewVoice';
import View from './section/View';

const StepComponents = [List, Create, Edit, NewVoice, View];
const pageNumber = {
  list: 0,
  create: 1,
  edit: 2,
  newVoice: 3,
  view: 4,
};
let CurrentPage;

const Invoice = () => {
  const [step, setStep] = useState(pageNumber.list);
  CurrentPage = StepComponents[step];
  const [nextStepPage, setNextStepPage] = useState(pageNumber.list);

  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<any>('list');

  return (
    <>
      {isLoading && <LoadingScreen />}
      <CurrentPage
        setNextStepPage={(enabled: number) => {
          setStep(enabled);
        }}
      />
    </>
  );
};

export default Invoice;
