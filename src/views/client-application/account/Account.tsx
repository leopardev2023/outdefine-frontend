import * as Sentry from '@sentry/react';
import { useEffect, useState } from 'react';
import Wrapper from './components/Wrapper';
// import Welcome from 'assets/tokens/welcome.png';
import Welcome from 'assets/welcome/welcome.png';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';

import Skeleton from 'react-loading-skeleton';
import applicationApi from 'network/application';
import companyProfileApi from 'network/client/CompanyProfile';
import { getStats } from './components/Utils';
import StarbucksSVG from 'assets/svg/application/Joe2.svg';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

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
  ['2021', '2022'],
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

const Account = () => {
  const dispatch = useAppDispatch();
  const [balance, setBalance] = useState<number>(-1);
  const [totalPendingAmount, setTotalPendingAmount] = useState<number>(-1);
  const companyId = useAppSelector((state) => state.companyprofile.id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);
  const [invoiceList, setInvoiceList] = useState<any | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [apexOptions, setApexOptions] = useState<ApexOptions>(templateOptions);
  const [statsList, setStatsList] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [talentList, setTalentList] = useState<any>([]);
  const [teamList, setTeamList] = useState<any>([]);
  const [seriesData, setSeriesData] = useState<any>([
    {
      name: 'Tokens',
      data: [0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    setApexOptions({
      ...apexOptions,
      xaxis: {
        ...apexOptions.xaxis,
        categories: [...filterOptions[selectedFilter]],
      },
    });
    statsList?.length > 0 &&
      setSeriesData([
        {
          ...seriesData,
          data: statsList[selectedFilter]?.map((i) => i) ?? [0, 0, 0, 0, 0],
        },
      ]);
  }, [selectedFilter, statsList]);

  useEffect(() => {
    (async () => {
      if (!clientId) return;
    })();
  }, [clientId]);

  const init = async () => {
    try {
      setLoading(true);
      await Promise.all([
        applicationApi.getTalentListByCompanyId(companyId),
        applicationApi.getTeamMembers({
          company_id: companyId,
        }),
        companyProfileApi.getCompanyBalanceById(companyId),
        applicationApi.getInvoiceListByCompanyId(companyId),
      ])
        .then(([talents, teamList, balanceData, invoiceData]) => {
          setTeamList(teamList);
          setTalentList(talents);
          setBalance(balanceData?.balance);
          setTotalPendingAmount(balanceData?.totalPendingAmount);
          setInvoiceList(invoiceData);
          setStatsList(getStats(invoiceData));
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err: any) {
      Sentry.captureException(err);

      setLoading(false);
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
    }
  };
  useEffect(() => {
    init();
  }, [companyId]);

  return (
    <Wrapper
      header_title='Account'
      ban_title='Welcome to your Account'
      ban_content='In account you will be able to keep track of your paid invoice total, invoices due and paid and your team members.'
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
                Amount pending
              </h2>
              <p className='text-black text-5xl font-bold'>
                {!loading ? '$' + balance : <Skeleton />}
              </p>
            </div>
            <div className='mt-5 w-[288px] h-[152px] py-[13px] px-[25px] rounded-[15px] shadow-3xl border border-primary'>
              <h2 className='text-black font-semibold text-base mb-5'>
                Total invoices pending
              </h2>
              <p className='text-black text-5xl font-bold'>
                {!loading ? totalPendingAmount : <Skeleton />}
              </p>
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
              <>
                <Skeleton height={300} className='mt-4' />
              </>
            )}
          </div>
        </div>
      </div>
      <div className='mt-[52px] flex justify-between gap-x-20'>
        <div className='flex flex-col gap-y-8 grow'>
          <span className='font-poppins text-lg font-semibold'>
            Active talent
          </span>
          <div className='w-full shadow-3xl rounded-[15px] pl-[29px] pt-3 pb-3 pr-[43px] border border-primary'>
            {!loading ? (
              <table className='w-full mx-auto font-inter font-bold'>
                <thead className='text-sm'></thead>
                <tbody className='text-xs w-full border-b-2 border-primary'>
                  {talentList?.length > 0 &&
                    talentList?.map((row: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <img
                            alt='talent'
                            src={row?.User.avatar}
                            className='w-[35px] h-[35px] rounded-full'
                          />
                        </td>
                        <td>
                          {(row?.User.first_name ?? '--') +
                            ' ' +
                            (row?.User.last_name ?? '--')}
                        </td>
                        <td>{row?.position ?? 'Remote engineer'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <Skeleton height={300} />
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-8 grow'>
          <span className='font-poppins text-lg font-semibold'>My Team</span>
          <div className='w-full shadow-3xl rounded-[15px] pl-[29px] pt-3 pb-3 pr-[43px] border border-primary'>
            {!loading ? (
              <table className='w-full mx-auto font-inter font-bold'>
                <thead className='text-sm'></thead>
                <tbody className='text-xs w-full border-b-2 border-primary'>
                  {teamList?.map((row: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <img
                          alt='teammate'
                          src={row?.User?.avatar ?? StarbucksSVG}
                          className='w-[35px] h-[35px] rounded-full'
                        />
                      </td>
                      <td>
                        {(row?.User?.first_name ?? '--') +
                          ' ' +
                          (row?.User?.last_name ?? '--')}
                      </td>
                      <td>{row.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Skeleton height={300} />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Account;
