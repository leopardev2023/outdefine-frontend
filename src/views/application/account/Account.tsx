import * as Sentry from '@sentry/react';
import { useEffect, useState } from 'react';
import Wrapper from './components/Wrapper';
// import Welcome from 'assets/tokens/welcome.png';
import Welcome from 'assets/welcome/welcome.png';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import applicationApi from 'network/application';
import profileApi from 'network/profile';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import Skeleton from 'react-loading-skeleton';
import SelectBox from './components/SelectBox';
import MessageQuestion from 'assets/svg/msgQus.svg';
import {
  checkWeek,
  checkMonth,
  checkSemi,
  checkYear,
  getStats,
} from './components/Utils';

const filters = ['Yearly', 'Semi-Yearly', 'Monthly', 'Weekly'];

const invoiceHeaders = [
  'Invoice#',
  'Date sent',
  'Amount',
  'Received from',
  'Date received',
];

const apexFilters = ['Weekly', 'Monthly', 'Semi-Yearly', 'Yearly'];

const filterOptions = [
  ['1', '2', '3', '4', '5'],
  [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  ['First Half', 'Second Half'],
  [new Date().getFullYear() - 1, new Date().getFullYear()],
];

const templateOptions: ApexOptions = {
  chart: {
    height: 350,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    fontFamily: 'Nunito Sans',
  },
  stroke: {
    curve: 'smooth',
    width: 4,
  },
  markers: {
    size: 5,
  },
  colors: ['#D0CBAB'],
  xaxis: {
    categories: [],
  },
};

type invoiceResultType = {
  Yearly?: any;
  Semi?: any;
  Monthly?: any;
  Weekly?: any;
};

const Account = () => {
  const dispatch = useAppDispatch();
  const freelancerId = useAppSelector((state) => state.profile.freelancer_id);
  const companyId = useAppSelector((state) => state.companyprofile.id);
  const [balance, setBalance] = useState<number>(-1);
  const [activeJobs, setActiveJobs] = useState<Array<any>>([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [apexOptions, setApexOptions] = useState<ApexOptions>(templateOptions);
  const [statsList, setStatsList] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [invoiceData, setInvoiceData] = useState<Array<any>>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('Yearly');
  const [invoiceResult, setInvoiceResult] = useState<invoiceResultType>({});
  const [transHis, setTransHis] = useState<Array<any>>([]);
  const [seriesData, setSeriesData] = useState<any>([
    {
      name: 'Stats',
      data: [0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    setTransHis(invoiceResult[filter]);
  }, [filter, invoiceResult]);

  useEffect(() => {
    (async () => {
      setApexOptions({
        ...apexOptions,
        xaxis: {
          ...apexOptions.xaxis,
          categories: [...filterOptions[selectedFilter]],
        },
      });
      setSeriesData([
        {
          name: 'Stats',
          data: statsList[selectedFilter]?.map((i) => i) ?? [0, 0, 0, 0, 0],
        },
      ]);
    })();
  }, [selectedFilter, statsList]);

  useEffect(() => {
    (async () => {
      if (!freelancerId) return;
    })();
  }, [freelancerId]);

  const initTrxHisStats = async (invoiceData: Array<any>) => {
    const inwh: any = [];
    const inmh: any = [];
    const insh: any = [];
    const inyh: any = [];

    invoiceData?.filter((item, index) => {
      if (checkWeek(item?.date_due)) {
        inwh.push(item);
      }
      if (checkMonth(item?.date_due)) {
        inmh.push(item);
      }
      if (checkSemi(item?.date_due)) {
        insh.push(item);
      }
      if (checkYear(item?.date_due)) {
        inyh.push(item);
      }
    });

    const invoiceDL = {
      Yearly: inyh,
      'Semi-Yearly': insh,
      Monthly: inmh,
      Weekly: inwh,
    };
    setInvoiceResult(invoiceDL);

    const statsData = getStats(invoiceData);

    setStatsList(statsData);
  };
  const init = async () => {
    try {
      setLoading(true);
      await Promise.all([
        profileApi.getTalentBlanceById(freelancerId),
        profileApi.getActiveJobsById(freelancerId),
        applicationApi.getInvoiceListByFreelanceId(freelancerId),
      ]).then(([blanceData, jobs, invoiceData]) => {
        setBalance(blanceData?.balance?.balance);
        setActiveJobs(jobs?.active);
        // setInvoiceData(invoiceData);
        initTrxHisStats(invoiceData);
      });

      setLoading(false);
    } catch (err: any) {
      console.log('err: ', err);
      Sentry.captureException(err);
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [freelancerId]);

  return (
    <Wrapper
      header_title='Account'
      ban_title='Welcome to your Account'
      ban_content='In account you will be able to keep track of your earnings date, balance and token earnings. You will also be able to create needed invoices.'
      ban_img={Welcome}
    >
      <div className='mt-[46px] flex gap-x-[30px] font-inter'>
        <div className='flex flex-col'>
          <div>
            <h1 className='font-poppins text-black font-semibold text-xl'>
              OverView
            </h1>
            <div className='mt-5 w-[288px] h-[152px] py-[13px] px-[25px] rounded-[15px] shadow-3xl border border-primary'>
              <h2 className='text-black font-semibold text-base mb-5'>
                Total cash balance
              </h2>
              <p className='text-black text-5xl font-bold'>
                {!loading ? balance : <Skeleton />}
              </p>
            </div>
          </div>
          <div className='mt-8'>
            <h1 className='font-poppins text-black font-semibold text-xl'>
              Active jobs
            </h1>
            <div className='mt-5 w-[288px] h-[152px] py-[13px] px-[25px] relative'>
              {!loading ? (
                activeJobs?.length > 0 &&
                activeJobs?.map((row: any, index: number) => (
                  <div
                    className={`rounded-full shadow-3xl border bg-white border-white absolute z-${
                      30 - index * 10
                    } left-${index * 16}`}
                  >
                    <img
                      alt='starbucks'
                      src={row?.Company?.logo}
                      className='w-[100px] h-[100px] rounded-full m-2 border-spacing-2 border-white'
                    />
                  </div>
                ))
              ) : (
                <Skeleton
                  circle
                  width={100}
                  height={100}
                  count={2}
                  inline
                  className='-ml-4'
                />
              )}
            </div>
          </div>
        </div>

        <div className='h-full w-full'>
          <h1 className='font-poppins font-semibold text-black text-xl'>
            Stats
          </h1>
          <div className='mt-5 w-full h-full py-[13px] px-[25px] rounded-[15px] shadow-3xl border border-primary'>
            <div className='flex justify-center gap-x-[17px] font-inter font-semibold text-xs'>
              {apexFilters.map((item, index) => (
                <button
                  className={`w-[103px] h-[22px] shadow-3xl border border-primary ${
                    selectedFilter === index ? 'bg-primary' : ''
                  }`}
                  onClick={() => !loading && setSelectedFilter(index)}
                >
                  {item}
                </button>
              ))}
            </div>
            {!loading ? (
              // @ts-ignore
              <Chart
                options={apexOptions}
                series={seriesData}
                type='line'
                width='100%'
              />
            ) : (
              <>{<Skeleton height={300} className='mt-4' />}</>
            )}
          </div>
        </div>
      </div>
      <div className='mt-[52px]'>
        <div className='flex justify-between relative'>
          <h1 className='font-poppins text-black font-semibold text-xl'>
            Transaction History
          </h1>
          <img
            alt='question'
            src={MessageQuestion}
            onMouseOver={() => setQus(true)}
            onMouseLeave={() => setQus(false)}
          />
          <div
            className={`text-black px-6 absolute w-[266px] top-[35px] -right-[120px] border border-primary shadow-3xl rounded-[15px] z-50 bg-white pt-6 pb-6 ${
              isQus ? 'block' : 'hidden'
            }`}
          >
            <h2 className='font-poppins font-semibold text-sm pb-[7px]'>
              Token Earnings
            </h2>
            <p className='font-inter font-semibold text-xs'>
              Token earnings are based off of tokens you have earned through
              assessments, referrals, jobs etc. This transaction history will
              also let you know what your tokens are vested to if that is an
              option ypu opted for.
            </p>
            <p className='font-inter font-semibold text-xs'>
              Not sure what vesting is? Go to information for more info.
            </p>
          </div>
        </div>

        <div className='mt-[60px] w-full shadow-3xl rounded-[15px] pl-[29px] pt-3 pb-5 pr-[43px] border border-primary'>
          <div className='flex justify-start gap-x-10 font-semibold mb-[15px]'>
            <SelectBox
              list={filters}
              className='shadow-none w-[150px] ml-[36px] text-sm'
              placeholder=''
              selected={filter}
              onSelect={setFilter}
            />
          </div>

          <table className='w-full mx-auto font-inter font-bold '>
            {!loading ? (
              <>
                <thead className='border-b-2 border-primary text-sm'>
                  {invoiceHeaders.map((item) => (
                    <th>{item}</th>
                  ))}
                </thead>
                <tbody className='text-xs w-full'>
                  {transHis?.length > 0 &&
                    transHis?.map((row: any, index: number) => (
                      <tr>
                        <td>{row?.slug}</td>
                        <td>
                          {row?.createdAt &&
                            new Date(row?.createdAt).toISOString().slice(0, 10)}
                        </td>
                        <td>${row.amount}</td>
                        <td>{row?.companyName}</td>
                        <td>
                          {row?.date_received &&
                            new Date(row?.date_received)
                              .toISOString()
                              .slice(0, 10)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </>
            ) : (
              <Skeleton height={300} />
            )}
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default Account;
