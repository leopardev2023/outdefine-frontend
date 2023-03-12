import * as Sentry from '@sentry/react';
import { useEffect, useState, useCallback } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store';

import {
  updateInvoiceDetail,
  updateInvoiceNumber,
  updateDraftId,
} from 'redux/slices/application';
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
import applicationApi from 'network/application';
import Charge from '../components/Charge';

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

const invoiceHeaders = [
  'Invoice#',
  'Date issued',
  'Date due',
  'Amount',
  'Sent to',
];

const Edit = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const freelancerId = useAppSelector((state) => state.profile.freelancer_id);
  const invoice = useSelector((state: RootState) => state.application.invoice);
  const invoiceNumber = useSelector(
    (state: RootState) => state.application.invoice_number
  );
  const draftId = useSelector((state: RootState) => state.application.draft_id);
  const [validArr, setValidArr] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<any>([]);
  const [companyAdd, setCompanyAdd] = useState<any>();
  const [companyList, setCompanyList] = useState<any>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [editSatus, setEditStatus] = useState<any>(pageStatus.MAIN);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [summaryCount, setSummaryCount] = useState(1);
  const [comNameList, setComNameList] = useState<any>([]);
  const [comAddressList, setComAddressList] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [invoiceInfo, setInvoiceInfo] = useState<Record<any, any>>({
    freelancer_id: '',
    company_id: 0,
    position: '',
    amount: 0,
    date_due: '',
    date_issued: '',
    charges: '',
    other_charges: '',
  });

  const [chargeList, setChargeList] = useState<Array<any>>([
    {
      completedDuties: '',
      hours: 0,
      rate: 0,
      amount: 0,
    },
  ]);

  const [otherCharge, setOtherCharge] = useState<any>({
    item: '',
    hours: 0,
    amount: 0,
  });

  const onInputValidate = (e, type) => {
    if (e.target.value === '') {
    }
  };

  const init = async () => {
    //companyList
    const companyListObj = await applicationApi.getCompanyList();
    setCompanyList(companyListObj);
    // setSummaryCount(chargeList.length)
    setOtherCharge(JSON.parse(invoice.other_charges));
    setChargeList(JSON.parse(invoice.charges));

    setInvoiceInfo({
      ...invoiceInfo,
      position: invoice.position,
      date_issued: invoice.date_issued,
      date_due: invoice.date_due,
    });
  };

  useEffect(() => {
    setSummaryCount(chargeList.length);
  }, [chargeList]);

  useEffect(() => {
    init();
  }, [invoice]);

  useEffect(() => {
    companyList.map((com) => {
      if (com.company_id == invoice.company_id) {
        setCompanyName(com.name);
        setCompanyAdd(com.city + ' ' + com.country);
      }
    });
    if (companyList.length != 0) {
      var comNL: any = [];
      var comAL: any = [];
      for (let i = 0; i < companyList.length; i++) {
        comNL.push(companyList[i].name);
        comAL.push(companyList[i].city + ' ' + companyList[i].country);
      }
      setComNameList(comNL);
      setComAddressList(comAL);
    }
  }, [companyList]);

  useEffect(() => {
    const comIndex = comNameList.indexOf(companyName);
    if (comIndex >= 0) {
      var selectedComId;
      companyList.map((item) => {
        if (item.name == companyName) {
          selectedComId = item.company_id;
        }
      });
      setInvoiceInfo({ ...invoiceInfo, company_id: selectedComId });
      setCompanyAdd(comAddressList[comIndex]);
    }
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
    chargeList.pop();
    const newChargeList = chargeList;
    setChargeList(newChargeList);
    summaryCount > 1 &&
      setInvoiceInfo({
        ...invoiceInfo,
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
  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 3600 * 24;
    return Math.round(diff);
  };
  const updateInvoice = async () => {
    try {
      var updatedCompanyId = 0;
      companyList.map((item) => {
        if (item.name == companyName) {
          updatedCompanyId = item.company_id;
        }
      });

      const delta = diff_minutes(new Date(invoiceInfo.date_due), new Date());
      var invType = '';
      if (delta > -1) {
        invType = 'upcoming';
      } else if (delta == -1) {
        invType = 'due';
      } else {
        invType = 'overdue';
      }

      if (invoiceNumber != null && invoiceNumber > 0) {
        const result = await applicationApi.updateInvoice({
          ...invoiceInfo,
          freelancer_id: freelancerId,
          charges: JSON.stringify(chargeList),
          other_charges: JSON.stringify(otherCharge),
          company_id: updatedCompanyId,
          invoice_number: invoiceNumber,
          invoice_type: invType,
        });
        dispatch(updateInvoiceNumber(-1));
        toast.custom(<Toast type="success" message="Updated Succesfully" />);
      } else {
        const result = await applicationApi.createInvoice({
          ...invoiceInfo,
          freelancer_id: freelancerId,
          charges: JSON.stringify(chargeList),
          other_charges: JSON.stringify(otherCharge),
          company_id: updatedCompanyId,
        });
        toast.custom(<Toast type="success" message="Created Successfully" />);
      }

      setInvoiceInfo({
        ...invoiceInfo,
        freelancer_id: freelancerId,
        charges: JSON.stringify(chargeList),
        other_charges: JSON.stringify(otherCharge),
      });

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

      setModalOpen(false);
      setEditStatus(pageStatus.MAIN);
      setNextStepPage(pageNumber.list);
    } catch (err: any) {
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
      Sentry.captureException(err);
    }
  };

  const saveDrafts = () => {
    var updatedCompanyId = 0;
    companyList.map((item) => {
      if (item.name == companyName) {
        updatedCompanyId = item.company_id;
      }
    });
    const draftInvoice = {
      ...invoiceInfo,
      freelancer_id: freelancerId,
      charges: JSON.stringify(chargeList),
      other_charges: JSON.stringify(otherCharge),
      draft_id: new Date().getTime(),
      company_id: updatedCompanyId,
    };
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
    reDraftInvoices.push(draftInvoice);
    toast.custom(<Toast type="success" message="Saved successfully in draft" />);
    dispatch(updateDraftId(-1));
    localStorage.setItem('draftInvoiceList', JSON.stringify(reDraftInvoices));
    setNextStepPage(pageNumber.list);
  };

  if (editSatus == pageStatus.MAIN) {
    return (
      <Wrapper
        header_title='Invoices'
        ban_title='Create a new invoice'
        ban_content='New job? No problem, create a quick on the go invoice by filling in the criteria below.'
        ban_img={Welcome}
      >
        <div className='mb-[57px]'>
          <div className='flex justify-between relative mt-10'>
            <div className='flex gap-x-14'>
              <button
                className='text-theme py-1 px-3 font-[14px] flex gap-x-2'
                onClick={() => {
                  setNextStepPage(pageNumber.view);
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
          <div className=' mt-10 ml-[110px]'>
            <span className='text-base font-black text-[18px]'>Bill to</span>
            <div className='flex gap-x-10 justify-between font-bold text-base md:gap-x-[100px] w-full items-center  mt-3'>
              <div className='relative flex flex-col w-full'>
                <label className='mb-3 font-bold font-inter text-[18px]'>
                  Company Name
                </label>
                <SelectBox
                  list={comNameList}
                  className='text-sm shadow-md shadow-3x rounded-xl'
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
                value={companyAdd}
                stress
              />
              <label className='w-full'></label>
            </div>
          </div>

          <div className=' mt-10 ml-[110px]'>
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
                      Issued date:
                    </label>
                    <DateInput
                      name='self-taught-1'
                      onChange={(val) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          date_issued: val,
                        })
                      }
                      mask='9999-99-99'
                      // value={invoiceInfo?.date_issued}
                      value={
                        invoice
                          ? invoice.date_issued
                          : new Date(invoiceInfo?.date_issued)
                              .toISOString()
                              .slice(0, 10)
                      }
                      onValidation={(valid: any) => onValidation(valid)}
                    />
                  </div>
                  <div>
                    <label className='font-inter font-bold text-[18px]'>
                      Due date
                    </label>
                    <DateInput
                      name='self-taught-2'
                      mask='9999-99-99'
                      onChange={(val) => {
                        setInvoiceInfo({
                          ...invoiceInfo,
                          date_due: val,
                        });
                      }}
                      value={
                        invoice
                          ? invoice.date_due
                          : new Date(invoiceInfo?.date_due)
                              .toISOString()
                              .slice(0, 10)
                      }
                      onValidation={(valid: any) => onValidation(valid)}
                    />
                  </div>
                </div>
              </div>
              <label className='w-full'></label>
            </div>
          </div>
          <div className=' mt-10 charge ml-[110px]'>
            <span className='text-[18px] font-black'>Charges</span>
            {Array(summaryCount)
              .fill(0)
              .map((item, index) => (
                <Charge
                  key={index}
                  setChargeList={setChargeList}
                  // charge={charge}
                  index={index}
                  chargeList={chargeList}
                />
              ))}
          </div>
          <div className='mt-20 ml-[110px] '>
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
          <div className=' mt-20 ml-[110px]'>
            <span className='text-[18px] font-black'>Other Charges</span>
            <div className='flex gap-x-10 justify-between items-center font-bold text-base  md:gap-x-[100px] w-full mt-3'>
              <FormInput
                label='Item'
                name='item'
                placeholder='Item'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setOtherCharge({ ...otherCharge, item: e.target.value });
                }}
                onBlur={(e) => onInputValidate(e, 'item')}
                stress
                value={otherCharge.item}
              />
              <FormInput
                label='Hours (optional)'
                name='hours'
                placeholder='Hours'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                  setOtherCharge({ ...otherCharge, hours: e.target.value });
                }}
                onBlur={(e) => onInputValidate(e, 'otherHours')}
                stress
                value={otherCharge.hours}
              />

              <FormInput
                label='Amount'
                name='otherAmount'
                placeholder='$$$'
                className='text-[18px]  w-full'
                onChange={(e: any) => {
                  setOtherCharge({ ...otherCharge, amount: e.target.value });
                }}
                onBlur={(e) => onInputValidate(e, 'amount')}
                stress
                value={otherCharge.amount}
              />
            </div>
          </div>
          <button
            className='create text-white bg-theme text-base float-right px-10 py-2 font-inter my-10'
            onClick={() => {
              setEditStatus(pageStatus.CREATED);
              var preAmount = 0;
              for (let i = 0; i < chargeList.length; i++) {
                preAmount += parseInt(chargeList[i].amount);
              }
              preAmount += parseInt(otherCharge.amount);
              setTotalAmount(preAmount);
              setInvoiceInfo({
                ...invoiceInfo,
                amount: preAmount,
              });
              dispatch(
                updateInvoiceDetail({
                  ...invoiceInfo,
                  freelancer_id: freelancerId,
                  charges: JSON.stringify(chargeList),
                  other_charges: JSON.stringify(otherCharge),
                })
              );
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
        ban_title='Updated an exist invoice'
        ban_content='Send your updated invoice directly to your employer.'
        ban_img={Welcome}
      >
        <div className='mt-[52px]'>
          <div className='flex justify-between relative'>
            <div className='flex gap-x-10'>
              <button
                className='text-theme py-1 px-3 font-[14px] flex gap-x-2'
                onClick={() => {
                  setEditStatus(pageStatus.MAIN);
                }}
              >
                <img
                  alt='arrow-left'
                  className='cursor-pointer'
                  src={leftArrowCircle}
                />
              </button>
              <h1 className='font-poppins text-black font-semibold text-xl'>
                updated invoice
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
                <tr>
                  <td className='flex justify-center items-center gap-x-[37px]'>
                    <img
                      alt='starbucks'
                      src={starbucksSVG}
                      className='w-[35px] h-[35px] rounded-full shadow-3xl border bg-white border-white'
                    />
                    {invoice.invoice_number}
                  </td>
                  <td>
                    {new Date(invoice.date_issued).toISOString().slice(0, 10)}
                  </td>
                  <td>
                    {new Date(invoice.date_due).toISOString().slice(0, 10)}
                  </td>
                  {/* <td>${invoice.amount}</td> */}
                  <td>${totalAmount}</td>
                  <td>{companyName}</td>
                  <td>
                    <div className='flex items-center justify-center gap-x-4'>
                      <img
                        alt='viewItem'
                        src={viewSVG}
                        className='w-[16px] h-[16px] rounded-full shadow-3xl border bg-white border-white cursor-pointer'
                        onClick={() => {
                          setInvoiceInfo({
                            ...invoiceInfo,
                            freelancer_id: freelancerId,
                            charges: JSON.stringify(chargeList),
                            other_charges: JSON.stringify(otherCharge),
                          });
                          dispatch(
                            updateInvoiceDetail({
                              ...invoiceInfo,
                              freelancer_id: freelancerId,
                              charges: JSON.stringify(chargeList),
                              other_charges: JSON.stringify(otherCharge),
                            })
                          );
                          setNextStepPage(pageNumber.view);
                        }}
                      />
                      <img
                        alt='editItem'
                        src={editSVG}
                        className='w-[16px] h-[16px] rounded-full shadow-3xl border bg-white border-white cursor-pointer'
                        onClick={() => {
                          setEditStatus(pageStatus.MAIN);
                        }}
                      />
                    </div>
                  </td>
                </tr>
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
              onClick={saveDrafts}
            >
              Save to drafts
            </button>
          </div>
        </div>
        <Modal isOpen={modalOpen}>
          <div className='flex flex-col items-center w-[550px] bg-white rounded-[15px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-[100px]'>
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
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>
            <button
              className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
              onClick={updateInvoice}
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
