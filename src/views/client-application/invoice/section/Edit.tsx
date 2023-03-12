import { useEffect, useState, useCallback } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';

import Welcome from 'assets/welcome/welcome.png';
import SVGCircle from '../../components/CircleSvg';
import SelectBox from '../components/SelectBox';
import SelectBoxWithImg from '../components/SelectBoxWithImg';
import DateInput from 'components/DateInput';
import MessageQuestion from 'assets/svg/msgQus.svg';
import closeSVG from 'assets/svg/assessment/close.svg';
import { FormInput, Radio } from 'components/forms';
import starbucksSVG from 'assets/svg/application/starbucks.svg';
import viewSVG from 'assets/svg/view.svg';
import editSVG from 'assets/svg/edit.svg';
import Button from 'components/Button';
import { Modal } from 'components/Modal';
import leftArrowCircle from 'assets/svg/arrow-circle-left.svg';

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
const companyNames = ['starbucks', 'aaa', 'bbb', 'ccc'];
const companyAddresses = ['starbucks111', 'aaa111', 'bbb111', 'ccc111'];

const invoiceHeaders = [
  'Invoice#',
  'Date issued',
  'Date due',
  'Amount',
  'Sent to',
];
const invoiceData = [
  {
    invoice_id: 123456,
    dateIssued: '01/05/2022',
    dateDue: '01/08/2022',
    amount: 5000,
    sentTo: 'Company name 1',
  },
  {
    invoice_id: 234567,
    dateIssued: '01/06/2022',
    dateDue: '01/09/2022',
    amount: 6000,
    sentTo: 'Company name 2',
  },
  {
    invoice_id: 345678,
    dateIssued: '01/07/2022',
    dateDue: '01/10/2022',
    amount: 7000,
    sentTo: 'Company name 3',
  },
];

const Edit = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const [validArr, setValidArr] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<any>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [editSatus, setEditStatus] = useState<any>(pageStatus.MAIN);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [summaryCount, setSummaryCount] = useState(
    //Object.keys(experience).length > 0 ? Object.keys(experience).length : 1
    1
  );

  const [invoiceInfo, setInvoiceInfo] = useState<Record<any, any>>({
    companyName: '',
    companyAddress: '',
    position: '',
    issuedDate: '',
    dueDate: '',
    companyDuties: '',
    hours: 0,
    hourlyRate: 0,
    amountTotal: 0,
    otherItem: '',
    otherHours: 0,
    otherAmount: 0,
  });

  const onInputValidate = (e, type) => {
    if (e.target.value === '') {
    }
  };

  useEffect(() => {
    const comIndex = companyNames.indexOf(companyName);
    setInvoiceInfo({
      ...invoiceInfo,
      companyAddress: companyAddresses[comIndex],
    });
  }, [companyName]);

  /**
   * Add charge
   */
  const handleAddCharge = useCallback(() => {
    setSummaryCount(summaryCount + 1);
  }, [summaryCount]);

  const handleRemoveCharge = useCallback(() => {
    if (summaryCount <= 1) return;
    setSummaryCount(summaryCount - 1);
    const { [summaryCount - 1]: _, ..._companyDuties } =
      invoiceInfo.companyDuties;
    summaryCount > 1 &&
      setInvoiceInfo({
        ...invoiceInfo,
        companyDuties: _companyDuties,
      });
  }, [summaryCount]);

  // const company = useSelector((state: RootState) => state.onboard.company);

  const onValidation = (valid: any) => {
    if (validArr.includes(valid.name) && valid.valid === true) {
      let ind = validArr.indexOf(valid.name);
      let temp = validArr;
      temp.splice(ind, 1);
      setValidArr([...temp]);
    }
    if (!validArr.includes(valid.name) && valid.valid === false) {
      let temp = validArr;
      temp.push(valid.name);
      setValidArr([...temp]);
    }
  };

  if (editSatus == pageStatus.MAIN) {
    return (
      <Wrapper
        header_title='Invoices'
        ban_title='Edit past invoice'
        ban_content='New job? No problem, create a quick on the go invoice by filling in the criteria below.'
        ban_img={Welcome}
      >
        <div className='mb-[100px]'>
          <div className='flex justify-between relative mt-10'>
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
                Edit past invoice
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
          <div className='ml-[105px] mt-10'>
            <span className='text-base font-black text-[18px]'>Bill to</span>
            <div className='flex gap-x-10 justify-between font-bold text-base md:gap-x-[100px] w-full items-center  mt-3'>
              <div className=' flex flex-col w-full'>
                <label className='mb-3 font-bold font-inter text-[18px]'>
                  Company Name
                </label>
                <SelectBox
                  list={companyNames}
                  className=' text-sm shadow-3xl rounded-[15px] z-50 bg-white'
                  placeholder=''
                  selected={companyName}
                  onSelect={setCompanyName}
                />
              </div>
              <FormInput
                label='Company address'
                name='companyAddress'
                placeholder='companyAddress.com'
                className='text-[18px] w-full'
                value={invoiceInfo.companyAddress}
                stress
              />
              <label className='w-full'></label>
            </div>
          </div>

          <div className='ml-[105px] mt-10'>
            <span className='text-[18px] font-black'>Subject line</span>
            <div className='flex gap-x-10 justify-between md:gap-x-[100px] font-bold text-base w-full mt-3'>
              <FormInput
                label='Position'
                name='position'
                placeholder='engineer'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setInvoiceInfo({ ...invoiceInfo, position: e.target.value });
                }}
                onBlur={(e) => onInputValidate(e, 'position')}
                stress
                value={invoiceInfo.position}
              />
              <div className='flex flex-col w-full'>
                <div className='flex flex-row flex-wrap md:flex-nowrap gap-y-4 gap-x-12 mt-3'>
                  <div>
                    <label className='font-inter font-bold text-[18px]'>
                      Issued date
                    </label>
                    <DateInput
                      name='self-taught-1'
                      onChange={(val) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          issuedDate: {
                            ...invoiceInfo?.issuedDate,
                          },
                        })
                      }
                      value={invoiceInfo?.issuedDate}
                      onValidation={(valid: any) => onValidation(valid)}
                    />
                  </div>
                  <div>
                    <label className='font-inter font-bold text-[18px]'>
                      Due date
                    </label>
                    <DateInput
                      name='self-taught-2'
                      onChange={(val) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          education: {
                            ...invoiceInfo?.dueDate,
                          },
                        })
                      }
                      value={invoiceInfo?.dueDate}
                      onValidation={(valid: any) => onValidation(valid)}
                    />
                  </div>
                </div>
              </div>
              <label className='w-full'></label>
            </div>
          </div>
          <div className='ml-[105px] mt-10 charge'>
            <span className='text-[18px] font-black'>Subject line</span>
            <div className='flex gap-x-10 justify-between font-bold text-base  md:gap-x-[100px] w-full mt-3'>
              <FormInput
                label='Completed duties'
                name='companyDuties'
                placeholder='Completed duties'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setInvoiceInfo({
                    ...invoiceInfo,
                    companyDuties: e.target.value,
                  });
                }}
                onBlur={(e) => onInputValidate(e, 'companyDuties')}
                stress
                value={invoiceInfo.companyDuties}
              />
              <div className='flex flex-row justify-between items-center gap-x-[72px] w-full'>
                <FormInput
                  label='Hours'
                  name='hours'
                  placeholder='Hours'
                  className='text-[18px] w-[150px]'
                  onChange={(e: any) => {
                    setInvoiceInfo({ ...invoiceInfo, hours: e.target.value });
                  }}
                  onBlur={(e) => onInputValidate(e, 'hours')}
                  stress
                  value={invoiceInfo.hours}
                />
                <FormInput
                  label='Hourly rate'
                  name='hourlyRate'
                  placeholder='Hourly rate'
                  className='text-[18px] w-[150px]'
                  onChange={(e: any) => {
                    setInvoiceInfo({
                      ...invoiceInfo,
                      hourlyRate: e.target.value,
                    });
                  }}
                  onBlur={(e) => onInputValidate(e, 'hourlyRate')}
                  stress
                  value={invoiceInfo.hourlyRate}
                />
              </div>
              <FormInput
                label='Amount total'
                name='amountTotal'
                placeholder='$$'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setInvoiceInfo({
                    ...invoiceInfo,
                    amountTotal: e.target.value,
                  });
                }}
                onBlur={(e) => onInputValidate(e, 'amountTotal')}
                stress
                value={invoiceInfo.amountTotal}
              />
            </div>
          </div>
          <div className='ml-[105px] mt-20'>
            <button
              className='text-theme py-1 pr-3 font-[14px] flex gap-x-2'
              onClick={handleAddCharge}
            >
              <SVGCircle type='plus' mode='dark' className='w-6 h-6' />
              <span className='font-extrabold text-lg'>Add another charge</span>
            </button>
            {summaryCount > 1 && (
              <button
                className='text-theme py-1 pr-3 font-[14px] flex gap-x-2'
                onClick={handleRemoveCharge}
              >
                <SVGCircle type='minus' mode='dark' className='w-6 h-6 ' />
                <span className='font-extrabold text-lg'>Delete charge</span>
              </button>
            )}
          </div>
          <div className='ml-[105px] mt-20'>
            <span className='text-[18px] font-black'>Other Charges</span>
            <div className='flex gap-x-10 justify-between items-center font-bold text-base  md:gap-x-[100px] w-full mt-3'>
              <FormInput
                label='Item'
                name='item'
                placeholder='Item'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setInvoiceInfo({ ...invoiceInfo, otherItem: e.target.value });
                }}
                onBlur={(e) => onInputValidate(e, 'otherItem')}
                stress
                value={invoiceInfo.otherItem}
              />
              <FormInput
                label='Hours (optional)'
                name='hours'
                placeholder='Hours'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setInvoiceInfo({
                    ...invoiceInfo,
                    otherHours: e.target.value,
                  });
                }}
                onBlur={(e) => onInputValidate(e, 'otherHours')}
                stress
                value={invoiceInfo.otherHours}
              />
              <span className='w-[200px]'></span>
              <FormInput
                label='Amount'
                name='otherAmount'
                placeholder='$$$'
                className='text-[18px]  w-full'
                onChange={(e: any) => {
                  setInvoiceInfo({
                    ...invoiceInfo,
                    otherAmount: e.target.value,
                  });
                }}
                onBlur={(e) => onInputValidate(e, 'otherAmount')}
                stress
                value={invoiceInfo.otherAmount}
              />
            </div>
          </div>
          <button
            className='saveChanges text-white bg-theme text-base float-right px-10 py-2 font-inter my-20'
            onClick={() => {
              setEditStatus(pageStatus.CREATED);
            }}
          >
            Save changes
          </button>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper
        header_title='Invoices'
        ban_title='Create a new invoice'
        ban_content='Send your new invoice directly to your employer.'
        ban_img={Welcome}
      >
        <div className='mt-[52px]'>
          <div className='flex justify-between relative'>
            <h1 className='font-poppins text-black font-semibold text-xl'>
              New invoice created
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
                Invoices
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
            <table className='w-full mx-auto font-inter font-bold'>
              <thead className='border-b-2 border-primary text-sm'>
                {invoiceHeaders.map((item) => (
                  <th>{item}</th>
                ))}
                <th></th>
              </thead>
              <tbody className='text-xs w-full'>
                {invoiceData?.map((row: any, index: number) => (
                  <tr>
                    <td className='flex justify-center items-center gap-x-[37px]'>
                      <img
                        alt='starbucks'
                        src={starbucksSVG}
                        className='w-[35px] h-[35px] rounded-full shadow-3xl border bg-white border-white'
                      />
                      {row.invoice_id}
                    </td>
                    <td>{row.dateIssued}</td>
                    <td>{row.dateDue}</td>
                    <td>${row.amount}</td>
                    <td>{row.sentTo}</td>
                    <td>
                      <div className='flex items-center justify-center gap-x-4'>
                        <img
                          alt='viewItem'
                          src={viewSVG}
                          className='w-[16px] h-[16px] rounded-full shadow-3xl border bg-white border-white cursor-pointer'
                          onClick={() => {
                            setNextStepPage(pageNumber.view);
                          }}
                        />
                        <img
                          alt='editItem'
                          src={editSVG}
                          className='w-[16px] h-[16px] rounded-full shadow-3xl border bg-white border-white cursor-pointer'
                          onClick={() => {
                            setNextStepPage(pageNumber.edit);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-10 flex flex-row gap-x-7'>
            <button
              className='text-white bg-theme py-2 px-5 text-base font-inter'
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              Send invoice
            </button>
            <button
              className='py-2 px-5 text-base font-inter border border-primary'
              onClick={() => {
                setNextStepPage(pageNumber.list);
              }}
            >
              Save to drafts
            </button>
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
                Resend edited invoice
              </h2>
            </div>
            <div className='invoiceItem w-full h-[400px] overflow-scroll mt-5'>
              {invoiceData?.map((row: any, index: number) => (
                <div>
                  <div className='flex justify-start items-center gap-x-[37px] mt-5'>
                    <img
                      alt='starbucks'
                      src={starbucksSVG}
                      className='w-[35px] h-[35px] rounded-full shadow-3xl border bg-white border-white'
                    />
                    <div className='flex flex-col'>
                      <span className='font-semibold'>Company name</span>
                      <span>{row.invoice_id}</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center gap-x-[37px] mt-5 text-sm'>
                    <div className='flex flex-col w-full gap-y-4'>
                      <span className='font-semibold'>Invoice issued</span>
                      <span>{row.dateIssued}</span>
                    </div>
                    <div className='flex flex-col w-full gap-y-4 '>
                      <span className='font-semibold'>Invoice due</span>
                      <span>{row.dateDue}</span>
                    </div>
                  </div>
                  <div className='flex flex-col justify-start gap-x-[37px] mt-5  text-sm gap-y-4'>
                    <span className='font-semibold'>Amount due</span>
                    <span>{row.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
              onClick={() => {
                setModalOpen(false);
                setEditStatus(pageStatus.MAIN);
              }}
            >
              Save and send
            </button>
          </div>
        </Modal>
      </Wrapper>
    );
  }
};

export default Edit;
