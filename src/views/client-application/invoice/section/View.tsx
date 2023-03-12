import { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store';

import Welcome from 'assets/welcome/welcome.png';
import leftArrowCircle from 'assets/svg/arrow-circle-left.svg';
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
  const [companyList, setCompanyList] = useState<any>([]);
  const [charges, setCharges] = useState<Array<any>>([]);
  const [companyName, setCompanyName] = useState<any>([]);
  const [companyCity, setCompanyCity] = useState<any>([]);
  const [companyCountry, setCompanyCountry] = useState<any>([]);

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
    if (invoice.invoice_type == 'paid') {
      toast.custom(<Toast type="warning" message="You already paid" />);
    } else {
      const result = await applicationApi.updateInvoice({
        ...invoice,
        invoice_type: 'paid',
      });
      toast.custom(<Toast type="success" message="Paid Successfully" />);
      setNextStepPage(pageNumber.list);
    }
  };

  return (
    <Wrapper
      header_title='Invoices'
      ban_title='Invoice preview'
      ban_content='Double check all the entered information and duties the talent preformed. If any adjustments are needed, contact the talent through messages so they can make corrections.'
      ban_img={Welcome}
    >
      <div className='mt-[52px]'>
        <div className='flex justify-between relative items-center'>
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
              Invoice preview
            </h1>
          </div>
          <div className='mr-10'>
            <button
              className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
              onClick={sendInvoice}
            >
              Pay invoice
            </button>
          </div>
        </div>
        <div className='mt-9 rounded-[15px] shadow-3xl border-white pb-[20%]'>
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
          <div className='mt-10 mr-[50px] float-right flex flex-col gap-y-4 w-[200px] font-poppins text-base'>
            <span className='w-full border-b-2 pb-4'>Subtotal</span>
            <div className='flex gap-x-10'>
              <span>Total:</span>
              <span>${invoice.amount}</span>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center gap-x-6 font-inter text-sm pt-10 pb-5'>
          <button
            className='bg-theme text-white py-2 px-6  mt-6'
            onClick={sendInvoice}
          >
            Pay Invoice
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default View;
