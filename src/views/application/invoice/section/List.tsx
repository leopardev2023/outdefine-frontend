import { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

import {
  updateInvoiceDetail,
  updateInvoiceNumber,
  updateDraftId,
} from 'redux/slices/application';
import profileApi from 'network/profile';
import Welcome from 'assets/welcome/welcome.png';
import SVGCircle from '../../components/CircleSvg';
import SelectBox from '../components/SelectBox';
import MessageQuestion from 'assets/svg/msgQus.svg';
import rightArrowCircle from 'assets/svg/arrow-circle-right.svg';
import starbucksSVG from 'assets/svg/application/starbucks.svg';
import applicationApi from 'network/application';
import { toast } from 'react-toastify';
import { type } from 'os';
import Skeleton from 'react-loading-skeleton';

const pageNumber = {
  list: 0,
  create: 1,
  edit: 2,
  newVoice: 3,
  view: 4,
};

const filters = ['All invoices', 'Drafts'];
const invoiceHeaders = [
  'Invoice#',
  'Date issued',
  'Date due',
  'Amount',
  'Type',
  'Sent to',
];

export interface Props {
  setNextStepPage: (enabled: number) => void;
}

const List = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const freelancerId = useAppSelector((state) => state.profile.freelancer_id);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeJobs, setActiveJobs] = useState<Array<any>>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('All invoices');
  const [invoiceResult, setInvoiceResult] = useState<any>({});
  const [companyList, setCompanyList] = useState<any>([]);

  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 3600 * 24;
    return Math.round(diff);
  };

  const init = async () => {
    try {
      setLoading(true);
      await Promise.all([
        applicationApi.getCompanyList(),
        applicationApi.getInvoiceListByFreelanceId(freelancerId),
        profileApi.getActiveJobsById(freelancerId),
      ]).then(([companyListObj, invoiceList, jobs]) => {
        setCompanyList(companyListObj);
        const draftListJson = localStorage.getItem('draftInvoiceList');
        const draftList = draftListJson ? JSON.parse(draftListJson) : '';
        const invoiceRst = {
          'All invoices': invoiceList,
          Drafts: draftList,
        };
        localStorage.setItem('viewCheck', 'false');
        setInvoiceResult(invoiceRst);
        setActiveJobs(jobs?.active);
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (freelancerId === undefined) {
      return;
    }
    init();
  }, []);

  return (
    <Wrapper
      header_title='Invoices'
      ban_title='Invoices'
      ban_content='In invoices you can create new invoices, use old invoices and see previous paid out invoices.'
      ban_img={Welcome}
    >
      <div className='mt-[46px] flex gap-x-[30px] font-inter'>
        <div className='flex flex-col'>
          <div className='mt-8'>
            <h1 className='font-poppins text-black font-semibold text-xl'>
              Active jobs
            </h1>
            <div className='mt-5 flex flex-row gap-x-[73px]'>
              {!isLoading ? (
                activeJobs?.length > 0 &&
                activeJobs?.map((row: any, index: number) => (
                  <div className='flex flex-col'>
                    <img
                      alt='starbucks'
                      src={row?.Company?.logo}
                      className='w-[100px] h-[100px] rounded-full shadow-3xl border bg-white border-white'
                    />
                    <span className='font-semibold mt-3'>
                      {row?.Company?.name}
                    </span>
                    {/* <span>Start: 1/1/22</span>
                                            <span>End: 6/1/22</span> */}
                  </div>
                ))
              ) : (
                <Skeleton
                  circle
                  width={120}
                  height={120}
                  count={3}
                  inline
                  className='-ml-4'
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[52px]'>
        <div className='flex justify-between relative'>
          <h1 className='font-poppins text-black font-semibold text-xl'>
            Invoices
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
        <div className='mt-5'>
          <button
            className='text-white py-1 px-3 font-[14px] bg-theme flex gap-x-2'
            onClick={() => {
              setNextStepPage(pageNumber.create);
            }}
          >
            <SVGCircle type='plus' mode='light' className='w-6 h-6' />
            <span>Create invoices</span>
          </button>
        </div>
        <div className='mt-[60px] w-full shadow-3xl rounded-[15px] pl-[29px] pt-3 pb-5 pr-[43px] border border-primary'>
          <div className='flex justify-start font-semibold mb-[15px] items-center'>
            <span>Sort by: </span>
            <SelectBox
              list={filters}
              className='shadow-none w-[150px] text-sm'
              placeholder=''
              selected={filter}
              onSelect={setFilter}
            />
          </div>
          {!isLoading ? (
            <table className='w-full mx-auto font-inter font-bold '>
              <>
                <thead className='border-b-2 border-primary text-sm'>
                  {invoiceHeaders.map((item) => (
                    <th>{item}</th>
                  ))}
                </thead>
                <tbody className='text-xs w-full'>
                  {invoiceResult[filter]?.length > 0 &&
                    invoiceResult[filter]?.map((row: any, index: number) => (
                      <tr>
                        <td className='flex justify-start pl-5 items-center gap-x-2'>
                          <img
                            alt='starbucks'
                            src={starbucksSVG}
                            className='w-[35px] h-[35px] rounded-full shadow-3xl border bg-white border-white'
                          />
                          {row.slug}
                        </td>
                        <td>
                          {new Date(row.date_issued).toISOString().slice(0, 10)}
                        </td>
                        <td>
                          {new Date(row.date_due).toISOString().slice(0, 10)}
                        </td>
                        <td>{row.amount}</td>
                        <td>
                          {filter !== 'Drafts' &&
                            (row.invoice_type === 'paid'
                              ? 'paid'
                              : diff_minutes(
                                  new Date(row.date_due),
                                  new Date(
                                    new Date().toISOString().slice(0, 10)
                                  )
                                ) > 0
                              ? 'upcoming'
                              : diff_minutes(
                                  new Date(row.date_due),
                                  new Date(
                                    new Date().toISOString().slice(0, 10)
                                  )
                                ) === 0
                              ? 'due'
                              : 'overdue')}
                        </td>
                        <td>
                          <div className='flex justify-between items-center'>
                            <span className='w-full pl-[40px]'>
                              {companyList.map((item) => {
                                if (item.company_id === row.company_id) {
                                  return item.name;
                                }
                              })}
                            </span>

                            <button
                              className='text-theme py-1 px-3 font-[14px] flex gap-x-2'
                              onClick={() => {
                                dispatch(
                                  updateInvoiceDetail({
                                    ...row,
                                    date_issued: new Date(row.date_issued)
                                      .toISOString()
                                      .slice(0, 10),
                                    date_due: new Date(row.date_due)
                                      .toISOString()
                                      .slice(0, 10),
                                  })
                                );

                                if (filter === 'Drafts') {
                                  dispatch(updateDraftId(row.draft_id));
                                } else {
                                  dispatch(
                                    updateInvoiceNumber(row.invoice_number)
                                  );
                                }
                                setNextStepPage(pageNumber.view);
                              }}
                            >
                              <img
                                alt='arrow-right'
                                className='cursor-pointer'
                                src={rightArrowCircle}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </>
            </table>
          ) : (
            <Skeleton height={300} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default List;
