import * as Sentry from '@sentry/react';
import { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store';
import {
  updateInvoiceDetail,
  updateInvoiceNumber,
} from 'redux/slices/application';
import Welcome from 'assets/welcome/welcome.png';
import SVGCircle from '../../components/CircleSvg';
import SelectBox from '../components/SelectBox';
import DateInput from 'components/DateInput';
import MessageQuestion from 'assets/svg/msgQus.svg';
import right_light from 'assets/svg/profile/circle/circle-right-light.svg';
import closeSVG from 'assets/svg/assessment/close.svg';
import { FormInput, Radio } from 'components/forms';
import { Modal } from 'components/Modal';
import starbucksSVG from 'assets/svg/application/starbucks.svg';
import leftArrowCircle from 'assets/svg/arrow-circle-left.svg';
import { initOnLoad } from 'apexcharts';
import applicationApi from 'network/application';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export interface Props {
  setNextStepPage: (enabled: number) => void;
}
const pageNumber = {
  list: 0,
  create: 1,
  edit: 2,
  newVoice: 3,
  view: 4,
};
enum pageStatus {
  MAIN,
  CREATED,
}

const View = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const invoice = useSelector((state: RootState) => state.application.invoice);
  const invoiceNumber = useSelector(
    (state: RootState) => state.application.invoice_number
  );
  const draftId = useSelector((state: RootState) => state.application.draft_id);
  const [validArr, setValidArr] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<any>([]);
  const [companyCity, setCompanyCity] = useState<any>([]);
  const [companyCountry, setCompanyCountry] = useState<any>([]);
  const [issuedDate, setIssuedDate] = useState<any>([]);
  const [dueDate, setDueDate] = useState<any>([]);
  const [charges, setCharges] = useState<Array<any>>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editSatus, setEditStatus] = useState<any>(pageStatus.MAIN);
  const [invoiceObj, setInvoiceObj] = useState<any>();
  const [companyList, setCompanyList] = useState<any>([]);
  const init = async () => {
    if (invoice) {
      const companyListObj = await applicationApi.getCompanyList();
      setCompanyList(companyListObj);
      setCharges(JSON.parse(invoice.charges));
    }
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    companyList.map((item) => {
      if (item.company_id == invoice.company_id) {
        setCompanyName(item?.name);
        setCompanyCity(item?.city);
        setCompanyCountry(item?.country);
        return item;
      }
    });
  }, [companyList]);

  const sendInvoice = async () => {
    try {
      if (invoice.invoice_number == null) {
        const result = await applicationApi.createInvoice(invoice);
        if (draftId > 0) {
          var draftInvoiceList: Array<any> = [];
          if (localStorage.getItem('draftInvoiceList') != null) {
            const draftListJson = localStorage.getItem('draftInvoiceList');
            draftInvoiceList = draftListJson ? JSON.parse(draftListJson) : '';
          }
          var reDraftInvoices = draftInvoiceList.filter((item) => {
            if (item['draft_id'] != draftId) {
              return item;
            }
          });
          localStorage.setItem(
            'draftInvoiceList',
            JSON.stringify(reDraftInvoices)
          );
        }
        //     const draftListJson = localStorage.getItem("draftInvoiceList");
        //     const draftList = draftListJson ? JSON.parse(draftListJson) : "";
        //     draftList.map(item => {
        //         if (
        //             item.amount == invoice.amount ||
        //             item.charges == invoice.charges ||
        //             item.company_id == invoice.company_id ||
        //             item.date_due == invoice.date_due ||
        //             item.date_issued == invoice.date_issued ||
        //             item.freelancer_id == invoice.freelancer_id ||
        //             item.other_charges == invoice.other_charges ||
        //             item.position == invoice.position
        //         ) {
        //             return item;
        //         }
        //     });
        //     localStorage.setItem("draftInvoiceList", JSON.stringify(draftList));
        //     toast.success('Created Success', {
        //                 //         autoClose: 2000,
        //     })
      } else {
        const result = await applicationApi.updateInvoice({
          ...invoice,
          invoice_number: invoiceNumber,
        });
        //     toast.success('Updated Successfully', {
        //                 //         autoClose: 2000,
        //     })
        //     dispatch(updateInvoiceNumber(
        //         -1
        //     ))
      }

      setModalOpen(false);
      setEditStatus(pageStatus.MAIN);
      setNextStepPage(pageNumber.list);
    } catch (err: any) {
      toast.custom(<Toast type="error" message={err} />);
      Sentry.captureException(err);
    }
  };

  return (
    <Wrapper
      header_title='Invoices'
      ban_title='Past  invoice'
      ban_content='Reuse past invoices you created to save time'
      ban_img={Welcome}
    >
      <div className='mt-[52px]'>
        <div className='flex justify-between relative'>
          <div className='flex gap-x-14'>
            <button
              className='text-theme py-1 px-3 font-[14px] flex gap-x-2'
              onClick={() => {
                setNextStepPage(pageNumber.list);
              }}
            >
              <img
                alt='arrow-left'
                className='cursor-pointer'
                src={leftArrowCircle}
              />
            </button>
            <h1 className='font-poppins text-black font-semibold text-xl'>
              Past invoice
            </h1>
          </div>
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
              Past invoice
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
        <div className='mt-9 rounded-[15px] shadow-3xl border-white'>
          <div className='mx-[110px] flex justify-between mt-8 py-10'>
            <div className='flex flex-col justify-start items-center gap-x-3 float-left font-normal text-base'>
              <span className='w-full text-2xl'>Invoice</span>
              <span className='w-full text-xl'>Subject line</span>
              <span className='w-full'>{invoice.position}</span>

              <span className='w-full mt-7 font-semibold'>Bill To:</span>
              <span className='w-full'>{companyName}</span>
              <span className='w-full mt-7 font-semibold'>Address:</span>
              <span className='w-full'>{companyCity}</span>
              <span className='w-full'>City, state, zipcode</span>
              <span className='w-full'>{companyCountry}</span>
            </div>
            <div className='flex flex-col justify-start pl-4 py-6 border-separate border-l-2 float-left font-semibold text-base h-[120px] gap-x-4'>
              <span>Invoice # {invoice.invoice_number}</span>
              <span>
                Issue Date{' '}
                {new Date(invoice.date_issued).toISOString().slice(0, 10)}
              </span>
              <span>
                Due Date {new Date(invoice.date_due).toISOString().slice(0, 10)}
              </span>
            </div>
          </div>
          <div className='ml-[110px] mr-[50px] flex justify-between mt-4'>
            <table className='w-full mx-auto font-inter font-bold'>
              <thead className='border-b-2 border-theme text-sm'>
                <th>Charges</th>
                <th className='border-x-2 border-theme'>
                  Qty/Hr <br></br>Rate
                </th>
                <th>Amount</th>
              </thead>
              <tbody className='text-xs w-full'>
                {charges?.map((row: any, index: number) => (
                  <tr className='border-b-2 border-theme'>
                    <td className=''>{row.completedDuties}</td>
                    <td className='border-x-2 border-theme'>
                      {row.hours} / {row.rate}
                    </td>
                    <td className=''>${row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mx-[110px] mt-10 font-extrabold'>
            <button
              className='text-theme py-1 font-[14px] flex gap-x-2'
              onClick={() => {
                setNextStepPage(pageNumber.edit);
              }}
            >
              {/* <SVGCircle type='plus' mode='dark' className='w-6 h-6' /> */}
              <SVGCircle type='plus' mode='dark' className='w-6 h-6' />
              <span className=''>Add another charge</span>
            </button>
          </div>
          <div className='mr-[50px] float-right flex flex-col gap-y-4 w-[200px] font-poppins text-base'>
            <span className='w-full border-b-2 pb-4'>Subtotal</span>
            <div className='flex gap-x-10'>
              <span>Total:</span>
              <span>${invoice.amount}</span>
            </div>
          </div>
          <div className=' ml-[110px] w-full flex justify-start gap-x-6 font-inter text-sm pt-10 pb-5'>
            <button
              className='bg-theme text-white py-2 px-6  mt-6'
              onClick={() => {
                setNextStepPage(pageNumber.edit);
              }}
            >
              Edit
            </button>

            <button
              className='py-2 px-6 border border-r-2  mt-6'
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              Resend
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen}>
        <div className='flex flex-col items-center w-[550px] bg-white rounded-[15px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-[140px]'>
          <div className=''>
            <button
              className='absolute right-6 top-6'
              onClick={() => setModalOpen(false)}
            >
              <img src={closeSVG} alt='' />
            </button>
            <h2 className='font-poppins font-extrabold text-[20px] mt-5 text-center'>
              Resend invoice
            </h2>
          </div>
          <div className='invoiceItem w-full h-[400px] overflow-scroll mt-5'>
            <div>
              <div className='flex justify-start items-center gap-x-[37px] mt-5'>
                <img
                  alt='starbucks'
                  src={starbucksSVG}
                  className='w-[35px] h-[35px] rounded-full shadow-3xl border bg-white border-white'
                />
                <div className='flex flex-col'>
                  <span className='font-semibold'>Company name</span>
                  <span>{companyName}</span>
                </div>
              </div>
              <div className='flex justify-between items-center gap-x-[37px] mt-5 text-sm'>
                <div className='flex flex-col w-full gap-y-4'>
                  <span className='font-semibold'>Invoice issued</span>
                  <span>
                    {new Date(invoice.date_issued).toISOString().slice(0, 10)}
                  </span>
                </div>
                <div className='flex flex-col w-full gap-y-4 '>
                  <span className='font-semibold'>Invoice due</span>
                  <span>
                    {new Date(invoice.date_due).toISOString().slice(0, 10)}
                  </span>
                </div>
              </div>
              <div className='flex flex-col justify-start gap-x-[37px] mt-5  text-sm gap-y-4'>
                <span className='font-semibold'>Amount due</span>
                <span>{invoice.amount}</span>
              </div>
            </div>
          </div>
          <button
            className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
            onClick={sendInvoice}
          >
            Send invoice
          </button>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default View;
